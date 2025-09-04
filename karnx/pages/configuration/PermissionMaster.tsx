"use client";

import { Box, Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";

interface Permission {
  id?: number;
  name?: string;
  slug?: string;
  guard_name?: string;
  srNo?: number;
}

const PermissionMaster = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<Permission[]>([]);
  const [addRow, setAddRow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission>({});

  // Pagination, Search, Sort states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortModel, setSortModel] = useState<any>([{ field: "name", sort: "asc" }]);

  const { user, setLoader } = useAuth();
  const clientId = user?.client_id;

  // Fetch Permissions
  const fetchPermissions = async () => {
    setLoader(true);
    try {
      const sortBy = sortModel[0]?.field || "id";
      const order = sortModel[0]?.sort || "asc";

      const res = await fetch(
        `${apiBaseUrl}/permission?client_id=${clientId}&page=${page + 1}&limit=${pageSize}&search=${search}&sortBy=${sortBy}&order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const json = await res.json();

      const withSrNo = json.data.map((perm: Permission, index: number) => ({
        ...perm,
        srNo: page * pageSize + index + 1,
      }));
      setData(withSrNo);
      setRowCount(json.total);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    setColumns([
      { headerName: "Sr.No", field: "srNo", width: 90 },
      { headerName: "Name", field: "name", flex: 1 },
      { headerName: "Guard Name", field: "guard_name", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params: any) => (
          <>
            <Tooltip title="Edit Permission">
              <IconButton size="small" onClick={() => editRow(params.row)}>
                <EditOutlinedIcon sx={{ color: "#848484", fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Permission">
              <IconButton size="small" onClick={() => deleteRow(params.row)}>
                <DeleteOutlineOutlinedIcon sx={{ color: "#848484", fontSize: "20px" }} />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    fetchPermissions();
  }, [page, pageSize, search, sortModel]);

  // CRUD
  const editRow = (perm: Permission) => {
    setSelectedPermission(perm);
    setAddRow(true);
  };

  const deleteRow = (perm: Permission) => {
    setSelectedPermission(perm);
    setDeleteModal(true);
  };

  const handleSavePermission = async () => {
    const method = selectedPermission?.id ? "PUT" : "POST";
    const url = selectedPermission?.id
      ? `${apiBaseUrl}/permission/${selectedPermission.id}`
      : `${apiBaseUrl}/permission`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...selectedPermission,
        guard_name: "api", // always api
        client_id: clientId,
      }),
    });

    if (res.ok) {
      fetchPermissions();
      setAddRow(false);
    }
  };

  const handleDeletePermission = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/permission/${selectedPermission.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Record deleted successfully");
        fetchPermissions();
        setDeleteModal(false);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete permission");
      }
    } catch (err) {
      console.error("Error deleting permission:", err);
      toast.error("Something went wrong! Please try again later.");
    }
  };

  return (
    <Box>
      <Typography component="h1" variant="h1">
        Permission Master
      </Typography>

      <MUIDataGrid
        gridColumns={columns}
        gridRows={data}
        paginationMode="server"
        sortingMode="server"
        rowCount={rowCount}
        page={page}
        pageSize={pageSize}
        // onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        onSortModelChange={(model) => setSortModel(model)}
        buttonText="Add Permission"
        onClick={() => {
          setSelectedPermission({});
          setAddRow(true);
        }}
      />

      {/* Add / Edit Modal */}
      <CustomModal
        open={addRow}
        setOpen={setAddRow}
        dataClose={() => setAddRow(false)}
        headerText={selectedPermission?.id ? "Edit Permission" : "Add Permission"}
      >
        <Grid container spacing={2}>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Permission Name"
              placeholder="Enter Permission Name"
              value={selectedPermission?.name || ""}
              onChange={(e) => setSelectedPermission({ ...selectedPermission, name: e.target.value })}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Permission Group Name (Slug)"
              placeholder="Enter Permission Group Name"
              value={selectedPermission?.slug || ""}
              onChange={(e) => setSelectedPermission({ ...selectedPermission, slug: e.target.value })}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              value="api"
              disabled
              inputLabel="Guard Name"
              placeholder="Guard Name"
            />
          </Grid>

          {/* Save / Cancel */}
          <Grid size={{ lg: 12, md: 12 }}>
            <Box sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleSavePermission}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={() => setAddRow(false)}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CustomModal>

      {/* Delete Confirmation */}
      <ConfirmationModal setOpen={setDeleteModal} open={deleteModal} dataAction={handleDeletePermission} />
    </Box>
  );
};

export default PermissionMaster;
