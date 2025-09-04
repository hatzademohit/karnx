"use client";

import { Box, Button, Grid, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid, SingleSelect } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import { useAuth } from "@/app/context/AuthContext";

interface RoleProps{
  name: string;
  id: string;
  client_id: number;
}

const RoleMaster = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [addRow, setAddRow] = useState(false);
  const [modalName, setModalName] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState(false);
  const [roles, setRecords] = useState<RoleProps>();
  // Pagination, Search, Sort states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortModel, setSortModel] = useState<any>([{ field: "name", sort: "asc" }]);
  const { user, setLoader } = useAuth();
  const [clients, setClient] = useState<any[]>([]);
  const clientId = user?.client_id;
  // Fetch Users
  const fetchRecords = async () => {
    setLoader(true)
  try {
    const sortBy = sortModel[0]?.field || "id";
    const order = sortModel[0]?.sort || "asc";

    const res = await fetch(
      `${apiBaseUrl}/role?client_id=${clientId}&page=${page + 1}&limit=${pageSize}&search=${search}&sortBy=${sortBy}&order=${order}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 your login token
        },
      }
    );

    const json = await res.json();

    const withSrNo = json.data.map((role: any, index: number) => ({ 
      ...role,
      srNo: page * pageSize + index + 1,     
      status: role.is_active == 1 ? "Active" : "Inactive",      
    }));

    setData(withSrNo);
    setRowCount(json.total); // from Laravel pagination response
    setLoader(false)
  } catch (error) {
    console.error("Error fetching users:", error);
    setLoader(false)
  }
};


  useEffect(() => {
    setColumns([
      { headerName: 'Sr.No', field: 'srNo', width: 90 },
      { headerName: 'Name', field: 'name', flex: 1 },
      { headerName: 'Guard Name', field: 'guard_name', flex: 1 },
      //{ headerName: 'Description', field: 'description', flex: 1 },
      { headerName: 'Client', field: 'client_name', flex: 1 },
      { headerName: 'Status', field: 'status', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        sortable: false,
        renderCell: (params: any) => (
          <>
            <Tooltip title='Edit User'>
              <IconButton size="small" onClick={() => editRow(params.row)}>
                <EditOutlinedIcon sx={{ color: '#848484', fontSize: '20px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete User'>
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
    fetchRecords();
    const fetchClients = async () => {
      setLoader(true)
      try {
        const res = await fetch(`${apiBaseUrl}/clients?client_id=${clientId}`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.token}` }
        });
        const data = await res.json();
        setClient(data.data); // assuming API returns array like [{id:1, name:"Admin"}, ...]
        setLoader(false)
      } catch (err) {
        console.error("Error fetching roles:", err);
        setLoader(false)
      }
    };
    fetchClients();
  }, [page, pageSize, search, sortModel]);

  // CRUD Functions
  const editRow = (roles: any) => {
    setRecords(roles);
    setAddRow(true);
    setModalName(true)
  };

  const deleteRow = (roles: any) => {
    setRecords(roles);
    setDeleteModal(true);
  };

  const handleSaveUser = async () => {
    const method = roles?.id ? "PUT" : "POST";
    const url = roles?.id
      ? `${apiBaseUrl}/role/${roles?.id}`
      : `${apiBaseUrl}/role`;

    const res = await fetch(url, {
      method,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // 👈 your login token
        },
      body: JSON.stringify(roles),
    });

    if (res.ok) {
      fetchRecords();
      setAddRow(false);
      const data = await res.json();
      toast.success(data.message || "Record updated successfully");
    }else{
      const errorData = await res.json();
      toast.error(errorData.message || "Something went wrong! Please try again later.");
    }
  };

  const handleDeleteRecord = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/role/${roles.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`, // 👈 your login token
          },
      });
      if (res.ok) {
          const data = await res.json();
          toast.success(data.message || "Record deleted successfully");
          fetchRecords();
          setDeleteModal(false);
          
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete user"); // ❌ error toast
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Something went wrong! Please try again later.");
    }    
  };

  return (
    <Box>
      <Typography component='h1' variant="h1">Role Master</Typography>

      <MUIDataGrid
        gridColumns={columns}
        gridRows={data}
       // paginationMode="server"
        sortingMode="server"
        rowCount={rowCount}
        page={page}
        pageSize={pageSize}
        // onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        onSortModelChange={(model) => setSortModel(model)}
        buttonText='Add Role'
        onClick={() => { setRecords(null); setAddRow(true); setModalName(false) }}
      />

      {/* Add / Edit Modal */}
      <CustomModal
        open={addRow}
        setOpen={setAddRow}
        dataClose={() => setAddRow(false)}
        headerText={modalName ? "Edit Role" : "Add Role"}
      >
        <Grid container spacing={2}>
         <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Role Name"
              placeholder="Enter Role Name"
              value={roles?.name || ""}
              onChange={(e) => setRecords({ ...roles, name: e.target.value })}
            />
          </Grid>
          {user?.client_id == 1 && !modalName &&
         <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <SingleSelect
                inputLabel="Client Name"
                size="small"
                name="client_id"
                value={roles?.client_id || ""}
                onChange={(e) => setRecords({ ...roles, client_id: e.target.value })}
              >
              {clients && clients?.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </SingleSelect>
          </Grid>
          }
          {/* more fields */}
          <Grid size={{ lg: 12, md: 12 }}>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleSaveUser}>
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
        dataAction={handleDeleteRecord}
      />
    </Box>
  );
};

export default RoleMaster;
