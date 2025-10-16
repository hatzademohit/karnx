"use client";

import { Box, Button, Grid, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid, SingleSelect } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import { useAuth } from "@/app/context/AuthContext";
const UserMaster = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [addRow, setAddRow] = useState(false);
  const [modalName, setModalName] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [clients, setClient] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]); // roles from API
  // Pagination, Search, Sort states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortModel, setSortModel] = useState<any>([{ field: "name", sort: "asc" }]);
  const [status, setStatus] = useState<any[]>([{id: 1, status: 'Active'}, {id: 2, status: 'Inactive'}]);

  const { user, setLoader, theme } = useAuth();
  const clientId = user?.client_id;
  // Fetch Users
  const fetchUsers = async () => {
  setLoader(true)
  try {
    const sortBy = sortModel[0]?.field || "id";
    const order = sortModel[0]?.sort || "asc";
    const limit = pageSize;
    const res = await fetch(
      `${apiBaseUrl}/user?client_id=${clientId}&page=${page + 1}&limit=${pageSize}&search=${search}&sortBy=${sortBy}&order=${order}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 your login token
        },
      }
    );

    const json = await res.json();

    const withSrNo = json.data.data.map((user: any, index: number) => ({ 
      ...user,
      srNo: page * pageSize + index + 1,
      gender: user.gender != null ?user.gender.charAt(0).toUpperCase() + user.gender.slice(1):'',      
      status: user.is_active == 1 ? "Active" : "Inactive",
    }));

    setData(withSrNo);
    setRowCount(json.total); // from Laravel pagination response
    //toast.success(json.message);
    setLoader(false)
  } catch (error) {
    setLoader(false)
    console.error("Error fetching users:", error);
  }
};

// Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      setLoader(true)
      try {
        const res = await fetch(`${apiBaseUrl}/role?client_id=${clientId}`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        setRoles(data.data); // assuming API returns array like [{id:1, name:"Admin"}, ...]
        setLoader(false)
      } catch (err) {
        console.error("Error fetching roles:", err);
        setLoader(false)
      }
    };
    fetchRoles();

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
  }, []);

  useEffect(() => {
    setColumns([
      { headerName: 'Sr.No', field: 'srNo', width: 90 },
      { headerName: 'Name', field: 'name', flex: 1 },
      { headerName: 'Email', field: 'email', flex: 1 },
      { headerName: 'Contact No.', field: 'phone', flex: 1 },
      { headerName: 'DOB', field: 'dob', flex: 1 },
      { headerName: 'Gender', field: 'gender', flex: 1 },
      { headerName: 'Client', field: 'client_name', flex: 1 },
      { headerName: 'Role', field: 'role', flex: 1 },
      { headerName: 'Status', field: 'status', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        sortable: false,
        renderCell: (params: any) => (
          <>
            <Tooltip title='Edit User' arrow placement="top">
              <IconButton size="small" onClick={() => editRow(params.row)}>
                <EditOutlinedIcon sx={{ color: theme?.common?.blueColor, fontSize: '20px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete User' arrow placement="top">
              <IconButton size="small" onClick={() => deleteRow(params.row)}>
                <DeleteOutlineOutlinedIcon sx={{ color: theme?.common?.redColor, fontSize: '20px' }} />
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
    setModalName(true)
    setAddRow(true);
  };

  const deleteRow = (user: any) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const handleSaveUser = async () => {
    const isEdit = selectedUser && selectedUser.id; // only edit if id exists
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${apiBaseUrl}/user/${selectedUser.id}`
      : `${apiBaseUrl}/user`;

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
      const msg = await res.json();
      toast.success(msg.message);
      setAddRow(false);
      setSelectedUser(null);
      setModalName(false);
    }else{
      const errorData = await res.json();
      toast.error(errorData.message || "Something went wrong! Please try again later.");
    }
  };

  const handleDeleteUser = async () => {
    setLoader(true)
    try {
      const res = await fetch(`${apiBaseUrl}/user/${selectedUser.id}`, {
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
      setLoader(false)
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Something went wrong! Please try again later.");
      setLoader(false)
    }

    
  };
  return (
    <Box>
      <Typography component='h1' variant="h1" sx={{ color: theme?.heading?.color, mb: theme?.heading?.marginBottom }}>User Master</Typography>

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
        buttonText='Add User'
        onClick={() => { setSelectedUser(null); setAddRow(true); setModalName(false) }}
      />

      {/* Add / Edit Modal */}
      <CustomModal
        open={addRow}
        setOpen={setAddRow}
        dataClose={() => setAddRow(false)}
        headerText={modalName ? "Edit User" : "Add User"}
      >
        <Grid container spacing={2}>
          <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
            <CustomTextField
              inputLabel="Email"
              placeholder="Enter Email"
              value={selectedUser?.email || ""}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              InputProps={{ readOnly: modalName }}
            />
          </Grid>
          <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
            <SingleSelect   // gives value and onChange from react-hook-form
                inputLabel="Role"
                size="small"
                name="role"
                value={selectedUser?.role_id || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, role_id: e.target.value })}
              >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </SingleSelect>
          </Grid>
          { modalName &&  
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
              <SingleSelect
                  inputLabel="Status"
                  size="small"
                  name="status"
                  value={selectedUser?.is_active || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, is_active: e.target.value })}
                >
                {status.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.status}
                  </MenuItem>
                ))}
              </SingleSelect>
            </Grid>
          }
          {user?.client_id == 1 && !modalName &&
          <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
            <SingleSelect
                inputLabel="Client Name"
                size="small"
                name="client_id"
                value={selectedUser?.client_id || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, client_id: e.target.value })}
              >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </SingleSelect>
          </Grid>
          }
          {/* more fields */}
          <Grid size={{ xs: 12 }}>
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

export default UserMaster;
