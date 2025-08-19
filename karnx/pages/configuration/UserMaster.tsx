import { Box, Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { ConfirmationModal, CustomModal, CustomTextField, MUIDataGrid } from "@/components";
import { useEffect, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const UserMaster = () => {
    
	const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [addRow, setAddRow] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
		setColumns([
			{ headerName: 'Sr.No', field: 'srNo', width: 90, maxWidth: 90, minWidth: 90 },
			{ headerName: 'Name', field: 'name', flex: 1, minWidth: 110 },
			{
				field: 'action',
				headerName: 'Action',
				flex: 1,
				width: 90,
				maxWidth: 90,
				minWidth: 90,
				sortable: false,
				filterable: false,
				renderCell: (params) => (
				<>
					<Tooltip title='Edit User' arrow placement="top">
						<IconButton size="small" onClick={() => editRow(params.row.id)}>
							<EditOutlinedIcon sx={{ color: '#848484', fontSize: '20px' }} />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete User' arrow placement="top">
						<IconButton size="small" onClick={() => deleteRow(params.row.id)}>
							<DeleteOutlineOutlinedIcon sx={{ color: '#848484', fontSize: '20px' }} />
						</IconButton>
					</Tooltip>
				</>
				),
			},
		])

        setData([
            {srNo: 1, id: 1, name: 'Mohit'}
        ])
	}, [])

    const editRow = (id) =>{
        setAddRow(true)
        console.log(id)
    }

    const deleteRow = (id) =>{
        setDeleteModal(true)
    }

    return(
        <Box>
            <Typography component='h1' variant="h1">Master Screen</Typography>
            <MUIDataGrid 
                gridColumns={columns}
				gridRows={data}
				onClick={() => setAddRow(true)}
				buttonText='Add Row'
            />
            
            <CustomModal open={addRow} setOpen={setAddRow} dataClose={() => setAddRow(false)} headerText="Add Row">
               <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <CustomTextField
                            inputLabel="User Name"
                            placeholder="Enter User Name"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <CustomTextField
                            inputLabel="Email"
                            placeholder="Enter Email"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <Box sx={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                            <Button variant="contained" className="btn btn-status bg-green" onClick={() => setAddRow(false)}>
                                Save
                            </Button>
                            <Button variant="contained" className="btn btn-status bg-red" onClick={() => setAddRow(false)}>
                                Cancel
                            </Button>
                        </Box>
                    </Grid>
               </Grid>
            </CustomModal>

            <ConfirmationModal setOpen={setDeleteModal} open={deleteModal} dataAction={() => {setDeleteModal(false); alert('id');}} />
        </Box>
    )
}

export default UserMaster;