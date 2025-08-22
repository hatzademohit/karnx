"use client";

import { Box, Button, Grid, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid, SingleSelect } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import { useAuth } from "@/app/context/AuthContext";
const RoleMaster = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [addRow, setAddRow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  // Pagination, Search, Sort states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortModel, setSortModel] = useState<any>([{ field: "name", sort: "asc" }]);
  const { user, setLoader } = useAuth();
  const clientId = user?.client_id;
  // Fetch Users
  const fetchUsers = async () => {
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

    const withSrNo = json.data.map((user: any, index: number) => ({ 
      ...user,
      srNo: page * pageSize + index + 1,     
      status: user.is_active == 1 ? "Active" : "Inactive",      
    }));

    setData(withSrNo);
    setRowCount(json.total); // from Laravel pagination response
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};


  useEffect(() => {
    setColumns([
      { headerName: 'Sr.No', field: 'srNo', width: 90 },
      { headerName: 'Name', field: 'name', flex: 1 },
      { headerName: 'Guard Name', field: 'guard_name', flex: 1 },
      { headerName: 'Description', field: 'description', flex: 1 },
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
    fetchUsers();
  }, [page, pageSize, search, sortModel]);

  // CRUD Functions
  const editRow = (user: any) => {
    setSelectedUser(user);
    setAddRow(true);
  };

  const deleteRow = (user: any) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const handleSaveUser = async () => {
    const method = selectedUser ? "PUT" : "POST";
    const url = selectedUser
      ? `${apiBaseUrl}/role/${selectedUser.id}`
      : `${apiBaseUrl}/role`;

    const res = await fetch(url, {
      method,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 your login token
        },
      body: JSON.stringify(selectedUser),
    });

    if (res.ok) {
      fetchUsers();
      setAddRow(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/role/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 your login token
          },
      });
      if (res.ok) {
          const data = await res.json();
          toast.success(data.message || "Record deleted successfully");
          fetchUsers();
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
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        onSortModelChange={(model) => setSortModel(model)}
        buttonText='Add Role'
        onClick={() => { setSelectedUser(null); setAddRow(true); }}
      />

      {/* Add / Edit Modal */}
      <CustomModal
        open={addRow}
        setOpen={setAddRow}
        dataClose={() => setAddRow(false)}
        headerText={selectedUser ? "Edit Role" : "Add Role"}
      >
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <CustomTextField
              inputLabel="Email"
              placeholder="Enter Email"
              value={selectedUser?.email || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            />
          </Grid>
          
          {/* more fields */}
          <Grid item lg={12}>
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
        dataAction={handleDeleteUser}
      />
    </Box>
  );
};

export default RoleMaster;
