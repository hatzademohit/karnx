"use client";

import { Box, Button, Grid, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid, SingleSelect } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import { useAuth } from "@/app/context/AuthContext";

const ClientMaster = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [addRow, setAddRow] = useState(false);
  const [modalName, setModalName] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [status, setStatus] = useState<any[]>([{id: 1, status: 'Active'}, {id: 0, status: 'Inactive'}]);

  // Pagination, Search, Sort states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortModel, setSortModel] = useState<any>([{ field: "name", sort: "asc" }]);

  const { setLoader, theme } = useAuth();

  // Fetch Clients
  const fetchClients = async () => {
    setLoader(true)
    try {
      const sortBy = sortModel[0]?.field || "id";
      const order = sortModel[0]?.sort || "asc";
      const res = await fetch(
        `${apiBaseUrl}/clients?page=${page + 1}&limit=${pageSize}&search=${search}&sortBy=${sortBy}&order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const json = await res.json();
      const withSrNo = json.data.map((client: any, index: number) => ({
        ...client,
        srNo: page * pageSize + index + 1,
        status: client.is_active == 1 ? "Active" : "Inactive",
      }));
      setData(withSrNo);
      setRowCount(json.total);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    setColumns([
      { headerName: 'Sr.No', field: 'srNo', width: 80 },
      { headerName: 'Name', field: 'name', flex: 1 },
      { headerName: 'Type', field: 'type', flex: 1 },
      { headerName: 'Contact Person', field: 'contact_person', flex: 1 },
      { headerName: 'Phone', field: 'phone', flex: 1 },
      { headerName: 'Email', field: 'email', flex: 1 },
      { headerName: 'Address Line 1', field: 'address_line1', flex: 1 },
      { headerName: 'Address Line 2', field: 'address_line2', flex: 1 },
      { headerName: 'Area', field: 'area', flex: 1 },
      { headerName: 'City', field: 'city', flex: 1 },
      { headerName: 'State', field: 'state', flex: 1 },
      { headerName: 'Country', field: 'country', flex: 1 },
      { headerName: 'Pincode', field: 'pincode', flex: 1 },
      { headerName: 'Status', field: 'status', flex: 0.6 },
      {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params: any) => (
          <>
            <Tooltip title='Edit Client' arrow placement="top">
              <IconButton size="small" onClick={() => editRow(params.row)}>
                <EditOutlinedIcon sx={{ color: theme?.common?.blueColor, fontSize: '20px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Client' arrow placement="top">
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
    fetchClients();
  }, [page, pageSize, search, sortModel]);

  // CRUD Functions
  const editRow = (client: any) => {
    setSelectedClient(client);
    setModalName(true)
    setAddRow(true);
  };

  const deleteRow = (client: any) => {
    setSelectedClient(client);
    setDeleteModal(true);
  };

  const handleSaveClient = async () => {
    const method = selectedClient && selectedClient.id ? "PUT" : "POST";
    const url = selectedClient && selectedClient.id
      ? `${apiBaseUrl}/clients/${selectedClient.id}`
      : `${apiBaseUrl}/clients`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(selectedClient),
    });

    if (res.ok) {
      fetchClients();
      const msg = await res.json();
      toast.success(msg.message);
      setAddRow(false);
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || "Something went wrong! Please try again later.");
    }
  };

  const handleDeleteClient = async () => {
    setLoader(true)
    try {
      const res = await fetch(`${apiBaseUrl}/clients/${selectedClient.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Record deleted successfully");
        fetchClients();
        setDeleteModal(false);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete client");
      }
      setLoader(false)
    } catch (err) {
      console.error("Error deleting client:", err);
      toast.error("Something went wrong! Please try again later.");
      setLoader(false)
    }
  };

  return (
    <Box>
      <Typography component='h1' variant="h1" sx={{ color: theme?.heading?.color, mb: theme?.heading?.marginBottom }}>Client Master</Typography>

      <MUIDataGrid
        gridColumns={columns}
        gridRows={data}
        sortingMode="server"
        rowCount={rowCount}
        page={page}
        pageSize={pageSize}
        // onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        onSortModelChange={(model) => setSortModel(model)}
        buttonText='Add Client'
        onClick={() => { setSelectedClient(null); setAddRow(true); setModalName(false) }}
      />

      {/* Add / Edit Modal */}
      <CustomModal
        open={addRow}
        setOpen={setAddRow}
        dataClose={() => setAddRow(false)}
        headerText={modalName ? "Edit Client" : "Add Client"}
      >
        <Grid container spacing={2}>
          {/* Disabled on Edit */}
          {/* {modalName && (
            <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
              <CustomTextField
                inputLabel="ID"
                placeholder="ID"
                value={selectedClient?.id || ''}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          )} */}
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Client Name"
              placeholder="Enter Client Name"
              value={selectedClient?.name || ""}
              onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <SingleSelect
              inputLabel="Type"
              size="small"
              name="type"
              value={selectedClient?.type || ""}
              onChange={(e) => setSelectedClient({ ...selectedClient, type: e.target.value })}
            >
              <MenuItem value="Aircraft Owner">Aircraft Owner</MenuItem>
              <MenuItem value="Aircraft Operator">Aircraft Operator</MenuItem>
              <MenuItem value="Aircraft Travel Agent">Aircraft Travel Agent</MenuItem>
              <MenuItem value="Portal Admin">Portal Admin</MenuItem>
            </SingleSelect>
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Contact Person"
              placeholder="Enter Contact Person"
              value={selectedClient?.contact_person || ""}
              onChange={(e) => setSelectedClient({ ...selectedClient, contact_person: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Phone"
              placeholder="Enter Phone"
              value={selectedClient?.phone || ""}
              onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Email"
              placeholder="Enter Email"
              value={selectedClient?.email || ""}
              onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Address Line 1"
              placeholder="Enter Address Line 1"
              value={selectedClient?.address_line1 || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, address_line1: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Address Line 2"
              placeholder="Enter Address Line 2"
              value={selectedClient?.address_line2 || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, address_line2: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Area"
              placeholder="Enter Area"
              value={selectedClient?.area || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, area: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="City"
              placeholder="Enter City"
              value={selectedClient?.city || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, city: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="State"
              placeholder="Enter State"
              value={selectedClient?.state || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, state: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Country"
              placeholder="Enter Country"
              value={selectedClient?.country || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, country: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Pincode"
              placeholder="Enter Pincode"
              value={selectedClient?.pincode || ''}
              onChange={(e) => setSelectedClient({ ...selectedClient, pincode: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          {modalName &&
            <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
              <SingleSelect
                inputLabel="Status"
                size="small"
                name="status"
                value={selectedClient?.is_active || ""}
                onChange={(e) => setSelectedClient({ ...selectedClient, is_active: e.target.value })}
              >
                {status.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.status}
                  </MenuItem>
                ))}
              </SingleSelect>
            </Grid>
          }
          <Grid size={{ lg: 12, md: 12 }}>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleSaveClient}>
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
        dataAction={handleDeleteClient}
      />
    </Box>
  );
};

export default ClientMaster;
