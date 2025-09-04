"use client";

import { Box, Button, Grid, IconButton, MenuItem, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid, SingleSelect } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import { useAuth } from "@/app/context/AuthContext";

const BookingStatusMaster = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [addRow, setAddRow] = useState(false);
  const [modalName, setModalName] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBookingStatus, setSelectedBookingStatus] = useState<any>(null);
  const [status, setStatus] = useState<any[]>([{id: 1, status: 'Active'}, {id: 0, status: 'Inactive'}]);

  // Pagination, Search, Sort states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortModel, setSortModel] = useState<any>([{ field: "name", sort: "asc" }]);

  const { setLoader, hasPermission } = useAuth();

  // Fetch BookingStatuss
  const fetchBookingStatus = async () => {
    setLoader(true)
    try {
      const sortBy = sortModel[0]?.field || "id";
      const order = sortModel[0]?.sort || "asc";
      const res = await fetch(
        `${apiBaseUrl}/booking-status?page=${page + 1}&limit=${pageSize}&search=${search}&sortBy=${sortBy}&order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const json = await res.json();
      const withSrNo = json.data.data.map((bookingStatus: any, index: number) => ({
        ...bookingStatus,
        srNo: page * pageSize + index + 1,
        status: bookingStatus.is_active === 1 ? "Active" : "Inactive",
      }));
      setData(withSrNo);
      setRowCount(json.total);
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.error("Error fetching BookingStatuss:", error);
    }
  };

  useEffect(() => {
    setColumns([
      { headerName: 'Sr.No', field: 'srNo', width: 80 },
      { headerName: 'Name', field: 'status_name', flex: 1 },
      { headerName: 'Description', field: 'description', flex: 1 },
      { headerName: 'Notification Template', field: 'notification_template', flex: 1 },
      { headerName: 'Color Code', field: 'color_code', flex: 1 },
      { headerName: 'Status', field: 'status', flex: 0.6 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 0.6,
        sortable: false,
        renderCell: (params: any) => (
          <>
          { hasPermission('booking status update') && (
            <Tooltip title='Edit Booking Status' arrow placement="top">
              <IconButton size="small" onClick={() => editRow(params.row)}>
                <EditOutlinedIcon sx={{ color: '#03045E', fontSize: '20px' }} />
              </IconButton>
            </Tooltip>
          )}
          { hasPermission('booking status delete') && (
            <Tooltip title='Delete Booking Status' arrow placement="top">
              <IconButton size="small" onClick={() => deleteRow(params.row)}>
                <DeleteOutlineOutlinedIcon sx={{ color: '#BC0019', fontSize: '20px' }} />
              </IconButton>
            </Tooltip>
          )}
          </>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    fetchBookingStatus();
  }, [page, pageSize, search, sortModel]);

  // CRUD Functions
  const editRow = (bookingStatus: any) => {
    setSelectedBookingStatus(bookingStatus);
    setModalName(true)
    setAddRow(true);
  };

  const deleteRow = (bookingStatus: any) => {
    setSelectedBookingStatus(bookingStatus);
    setDeleteModal(true);
  };

  const handleSaveBookingStatus = async () => {
    const method = selectedBookingStatus && selectedBookingStatus.id ? "PUT" : "POST";
    const url = selectedBookingStatus && selectedBookingStatus.id
      ? `${apiBaseUrl}/booking-status/${selectedBookingStatus.id}`
      : `${apiBaseUrl}/booking-status`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(selectedBookingStatus),
    });

    if (res.ok) {
      fetchBookingStatus();
      const msg = await res.json();
      toast.success(msg.message);
      setAddRow(false);
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || "Something went wrong! Please try again later.");
    }
  };

  const handleDeleteBookingStatus = async () => {
    setLoader(true)
    try {
      const res = await fetch(`${apiBaseUrl}/booking-status/${selectedBookingStatus.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message || "Record deleted successfully");
        fetchBookingStatus();
        setDeleteModal(false);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete booking status");
      }
      setLoader(false)
    } catch (err) {
      console.error("Error deleting booking status:", err);
      toast.error("Something went wrong! Please try again later.");
      setLoader(false)
    }
  };

  return (
    <Box>
      <Typography component='h1' variant="h1" sx={{ color: '#03045E', mb: '24px' }}>Booking Status Master</Typography>
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

        // buttonText='Add Booking Status'
        // onClick={() => { setSelectedBookingStatus(null); setAddRow(true); setModalName(false) }}
        buttonText={hasPermission("booking status create") ? "Add Booking Status" : undefined}
        onClick={() => {
            if (hasPermission("booking status create")) {
            setSelectedBookingStatus(null);
            setAddRow(true);
            setModalName(false);
            }
        }}
        
      />
    
      {/* Add / Edit Modal */}
      <CustomModal
        open={addRow}
        setOpen={setAddRow}
        dataClose={() => setAddRow(false)}
        headerText={modalName ? "Edit Booking Status" : "Add Booking Status"}
      >
        <Grid container spacing={2}>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Booking Status Name"
              placeholder="Enter Booking Status Name"
              value={selectedBookingStatus?.status_name || ""}
              onChange={(e) => setSelectedBookingStatus({ ...selectedBookingStatus, status_name: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Description"
              size="small"
              name="description"
              value={selectedBookingStatus?.description || ""}
              onChange={(e) => setSelectedBookingStatus({ ...selectedBookingStatus, description: e.target.value })}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Notification Template"
              placeholder="Enter Notification Template"
              value={selectedBookingStatus?.notification_template || ""}
              onChange={(e) => setSelectedBookingStatus({ ...selectedBookingStatus, notification_template: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <CustomTextField
              inputLabel="Status Color Code"
              placeholder="Enter Phone"
              type="color"
              value={selectedBookingStatus?.color_code || ""}
              onChange={(e) => setSelectedBookingStatus({ ...selectedBookingStatus, color_code: e.target.value })}
              InputProps={{ readOnly: false }}
            />
          </Grid>
          
          {modalName &&
            <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
              <SingleSelect
                inputLabel="Status"
                size="small"
                name="status"
                value={selectedBookingStatus?.is_active || ""}
                onChange={(e) => setSelectedBookingStatus({ ...selectedBookingStatus, is_active: e.target.value })}
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
              <Button variant="contained" onClick={handleSaveBookingStatus}>
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
        dataAction={handleDeleteBookingStatus}
      />
    </Box>
  );
};

export default BookingStatusMaster;
