"use client";

import { Box, Button, Grid, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid, SingleSelect } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import { useAuth } from "@/app/context/AuthContext";
const PermissionMaster = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [addRow, setAddRow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedpermission, setSelectedpermission] = useState<any>(null);
  // Pagination, Search, Sort states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortModel, setSortModel] = useState<any>([{ field: "name", sort: "asc" }]);

    const { permission, setLoader } = useAuth();
    const clientId = permission?.client_id;
  // Fetch permissions
  const fetchpermissions = async () => {
  try {
    const sortBy = sortModel[0]?.field || "id";
    const order = sortModel[0]?.sort || "asc";

    const res = await fetch(
      `${apiBaseUrl}/permission?client_id=${clientId}&page=${page + 1}&limit=${pageSize}&search=${search}&sortBy=${sortBy}&order=${order}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 your login token
        },
      }
    );

    const json = await res.json();

    const withSrNo = json.data.map((permission: any, index: number) => ({ 
      ...permission,
      srNo: page * pageSize + index + 1      
    }));

    setData(withSrNo);
    setRowCount(json.total); // from Laravel pagination response
  } catch (error) {
    console.error("Error fetching permissions:", error);
  }
};


  useEffect(() => {
    setColumns([
      { headerName: 'Sr.No', field: 'srNo', width: 90 },
      { headerName: 'Name', field: 'name', flex: 1 },
      { headerName: 'Guard Name', field: 'guard_name', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        sortable: false,
        renderCell: (params: any) => (
          <>
            <Tooltip title='Edit Permission'>
              <IconButton size="small" onClick={() => editRow(params.row)}>
                <EditOutlinedIcon sx={{ color: '#848484', fontSize: '20px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Permission'>
              <IconButton size="small" onClick={() => deleteRow(params.row)}>
                <DeleteOutlineOutlinedIcon sx={{ color: '#848484', fontSize: '20px' }} />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    fetchpermissions();
  }, [page, pageSize, search, sortModel]);

  // CRUD Functions
  const editRow = (permission: any) => {
    setSelectedpermission(permission);
    setAddRow(true);
  };

  const deleteRow = (permission: any) => {
    setSelectedpermission(permission);
    setDeleteModal(true);
  };

  const handleSavepermission = async () => {
    const method = selectedpermission ? "PUT" : "POST";
    const url = selectedpermission
      ? `${apiBaseUrl}/permission/${selectedpermission.id}`
      : `${apiBaseUrl}/permission`;

    const res = await fetch(url, {
      method,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 your login token
        },
      body: JSON.stringify(selectedpermission),
    });

    if (res.ok) {
      fetchpermissions();
      setAddRow(false);
    }
  };

  const handleDeletepermission = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/permission/${selectedpermission.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 your login token
          },
      });
      if (res.ok) {
          const data = await res.json();
          toast.success(data.message || "Record deleted successfully");
          fetchpermissions();
          setDeleteModal(false);
          
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete permission"); // ❌ error toast
      }
    } catch (err) {
      console.error("Error deleting permission:", err);
      toast.error("Something went wrong! Please try again later.");
    }

    
  };

  return (
    <Box>
      <Typography component='h1' variant="h1">Permission Master</Typography>

      <MUIDataGrid
        gridColumns={columns}
        gridRows={data}
       // paginationMode="server"
        sortingMode="server"
        rowCount={rowCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        onSortModelChange={(model) => setSortModel(model)}
        buttonText='Add Permission'
        onClick={() => { setSelectedpermission(null); setAddRow(true); }}
      />

      {/* Add / Edit Modal */}
      <CustomModal
        open={addRow}
        setOpen={setAddRow}
        dataClose={() => setAddRow(false)}
        headerText={selectedpermission ? "Edit Permission" : "Add Permission"}
      >
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <CustomTextField
              inputLabel="Permission Name"
              placeholder="Enter Permission Name"
              value={selectedpermission?.name || ""}
              onChange={(e) => setSelectedpermission({ ...selectedpermission, name: e.target.value })}
            />
          </Grid>
          <Grid item lg={6}>
            <CustomTextField
              inputLabel="Permission Group Name"
              placeholder="Enter Permission Group Name"
              value={selectedpermission?.slug || ""}
              onChange={(e) => setSelectedpermission({ ...selectedpermission, slug: e.target.value })}
            />
          </Grid>
          <Grid item lg={6}>
            <CustomTextField
              value={selectedpermission?.guard_name || "api"}
              onChange={(e) => setSelectedpermission({ ...selectedpermission, guard_name: e.target.value })}
              type="hidden"
            />
          </Grid>
          {/* more fields */}
          <Grid item lg={12}>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleSavepermission}>
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
      <ConfirmationModal
        setOpen={setDeleteModal}
        open={deleteModal}
        dataAction={handleDeletepermission}
      />
    </Box>
  );
};

export default PermissionMaster;
