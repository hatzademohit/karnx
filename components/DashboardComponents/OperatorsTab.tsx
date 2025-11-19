import React, { use, useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button, IconButton, useTheme, Link, Divider, Checkbox } from "@mui/material";
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import CustomModal from "../CustomModal";
import StarIcon from "@mui/icons-material/Star";
import { apiBaseUrl } from "@/karnx/api";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

interface OperatorsTabProps {
    inquiryId?: any;
}

const OperatorsTab: React.FC<OperatorsTabProps> = ({ inquiryId }) => {

    const callApi = useApiFunction();
    const theme = useTheme();
    const [addOperator, setAddOperator] = useState(false);
    const [assignedOperator, setAssignedOperator] = useState<any[]>([]);
    const [getOperatorList, setOperatorList] = useState<any[]>([]);
    const [selectedOperators, setSelectedOperators] = useState<any[]>([]);
    const { assignedOperatorLength, setAssignedOperatorLength } = useInquiryDetails();

    const handleOpenAddOperator = async () => {
        setAddOperator(true);
        const operators = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-operator/get-operators`, body: { inquiry_id: inquiryId } });
        setOperatorList(operators.data || []);
    }

    const handleSelect = (id: number) => {
        setSelectedOperators((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const addOperators = async (selectedOperators: any[]) => {
        if (selectedOperators.length > 0) {
            const created = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-operator/operators-assign`, body: { inquiry_id: inquiryId, operator_ids: selectedOperators } });
            if (created?.status === true) {
                toast.success(created?.message);
                fetchAssignedOperators(inquiryId);
                setAddOperator(false);
            } else {
                toast.error(created?.message);
            }

        } else {
            alert("Please select at least one operator.");
        }
    };

    const fetchAssignedOperators = async (inquiryId) => {
        console.log(selectedOperators);
        const fetched = await callApi({ method: 'GET', url: `${apiBaseUrl}/inquiry-operator/get-assigned-operators?inquiry_id=${encodeURIComponent(inquiryId)}&selected=${selectedOperators}` });
        if (fetched?.status === true) {
            //toast.success(fetched?.message);
            setAssignedOperator(fetched.data || []);
            setAssignedOperatorLength(fetched?.data?.length || [])
        } else {
            toast.error(fetched?.message);
        }
    };

    const removeOperator = async (operatorId: number) => {
        if (operatorId) {
            const deleted = await callApi({ method: 'DELETE', url: `${apiBaseUrl}/inquiry-operator/operators-remove/${operatorId}` });
            if (deleted?.status === true) {
                toast.success(deleted?.message);
                fetchAssignedOperators(inquiryId);
            } else {
                toast.error(deleted?.message);
            }
        } else {
            alert("Please select at least one operator.");
        }
    };

    useEffect(() => {
        fetchAssignedOperators(inquiryId);
    }, []);

    return (
        <>
            {/* heading */}
            {assignedOperator.length > 0 &&
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: '8px' }}>
                    <Box>
                        <Typography component='h4' variant="h4">Allocated Operators</Typography>
                        <Typography sx={{ color: '#4D4D4D' }}>{assignedOperator.length} operators assigned to this inquiry</Typography>
                    </Box>
                    <Box>
                        <Button className="btn btn-danger" onClick={handleOpenAddOperator}>+ Add Operators</Button>
                    </Box>
                </Box>
            }
            {/* operators */}
            <Grid container spacing={{ md: 2, xs: 1 }}>
                {assignedOperator.length > 0 && assignedOperator?.map((op) =>
                    <Grid key={op.id || op} size={{ xs: 12, md: 6 }}>
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                            <CardContent className="card-content">
                                {/* header section */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <IconButton sx={{ backgroundColor: `${theme?.common?.blueColor} !important`, color: '#ffffff', borderRadius: '8px', width: '40px', height: '40px' }}>
                                            <FlightOutlinedIcon />
                                        </IconButton>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="h4">{op.name}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <StarOutlinedIcon sx={{ color: '#FFD700' }} />
                                                <Typography component="span" sx={{ fontFamily: 'poppins-semibold', fontSize: '14px', color: '#4D4D4D' }}> {op.rating}</Typography>
                                                <Typography component="span" sx={{ fontSize: '14px', color: '#4B5563', ml: 1 }}>{op.flights} flights</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <IconButton onClick={() => removeOperator(op.id)}>
                                        <ClearOutlinedIcon />
                                    </IconButton>
                                </Box>
                                {/* body section */}
                                <Grid container spacing={{ md: 2, xs: 1 }} sx={{ mt: 2 }}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <LocalPoliceOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Safety Rating
                                        </Typography>
                                        <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{op.safety_rating}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <WatchLaterOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Response Time
                                        </Typography>
                                        <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{op.response_time}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <FlightOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Fleet Overview
                                        </Typography>
                                        <Typography sx={{ mt: 0.5 }} variant="h5">{op?.fleet_overview?.total_aircraft ?? 0} aircraft</Typography>
                                        <Typography sx={{ mt: 0.5 }}>
                                            {(op?.fleet_overview?.aircraft_types ?? []).map((type, index) => (
                                                <Typography key={index || type} component="span" className="custom-pill" sx={{ backgroundColor: '#E1F2FF', mr: 0.5 }}>{type.type} {type.count}</Typography>
                                            ))}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <LanguageIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Operating Regions
                                        </Typography>
                                        <Typography sx={{ mt: 0.5 }}>
                                            {(op?.operating_regions ?? []).map((reg, index) => (
                                                <Typography key={index || reg} component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>{reg}</Typography>
                                            ))}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Certifications
                                        </Typography>
                                        <Typography sx={{ mt: 0.5 }}>
                                            {(op?.certifications ?? []).map((c, index) => (
                                                <Typography key={index || c} component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>{c}</Typography>
                                            ))}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Divider />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, '& a': { display: 'inline-flex', flexWrap: 'nowrap' } }}>
                                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    <Link
                                                        href={`mailto:${op?.contact_methods?.email}`}
                                                        underline="none"
                                                        color="text.secondary"
                                                        title=""
                                                    >
                                                        <EmailOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Email
                                                    </Link>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <Link
                                                        href={`tel:${op?.contact_methods?.call}`}
                                                        underline="none"
                                                        color="text.secondary"
                                                    >
                                                        <CallOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Call
                                                    </Link>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <Link
                                                        href={String(op?.contact_methods?.website)}
                                                        underline="none"
                                                        color="text.secondary"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <LaunchOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Websites
                                                    </Link>
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Specialties:
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                                    {(op?.specialties ?? []).map((spec, index) => (
                                                        <Typography key={index || spec} component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>{spec}</Typography>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
            {assignedOperator.length === 0 &&
                <Box sx={{ padding: 4, border: '2px dashed #cccccc', display: 'flex', gap: 1.5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F7FF', borderRadius: '8px' }}>
                    <SettingsOutlinedIcon sx={{ fontSize: '35px', color: '#808080' }} />
                    <Typography variant="h4">No operators assigned yet</Typography>
                    <Typography color="text.secondary">Operators will appear here once you assigned operators to inquiry.</Typography>
                    <Button className='btn btn-danger' onClick={handleOpenAddOperator}><AddIcon sx={{ mr: '4px' }} /> Add Operators</Button>
                </Box>
            }
            <CustomModal headerText="Add Operator" open={addOperator} setOpen={setAddOperator} dataClose={() => setAddOperator(false)}>
                <Box>
                    {getOperatorList?.map((op) => (

                        <Card
                            key={op.id}
                            sx={{
                                mb: 2,
                                border: selectedOperators.includes(op.id) && "2px solid rgba(63,81,181,0.5)",
                                borderRadius: 2,
                                boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                                transition: "0.3s",
                                "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.15)" },
                            }}
                        >
                            <CardContent className="card-content">
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Box sx={{ borderRight: '2px solid #E6E6E6', width: '50px', height: '100%', minHeight: '84px', alignContent: 'center' }}>
                                        <Checkbox
                                            checked={selectedOperators.includes(op.id)}
                                            onChange={() => handleSelect(op.id)}
                                        />
                                    </Box>

                                    <Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <IconButton sx={{ backgroundColor: `${theme?.common?.blueColor} !important`, color: '#ffffff', borderRadius: '8px', width: '40px', height: '40px' }}>
                                                <FlightOutlinedIcon />
                                            </IconButton>
                                            <Box>
                                                <Typography variant="h5" fontWeight={600}>
                                                    {op.name}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexWrap: "wrap",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2" color="text.secondary">
                                                        <StarIcon
                                                            sx={{
                                                                fontSize: 16,
                                                                color: "#fbc02d",
                                                                verticalAlign: "middle",
                                                                mr: 0.3,
                                                            }}
                                                        />
                                                        {op.rating}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        • {op.flights} flights
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        • {op.aircraft} aircraft
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        • {op.duration}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            {op.tags.map((tag, index) => (
                                                <Typography key={index || tag} component="span" className="custom-pill" sx={{ backgroundColor: '#f4f5f7' }}>{tag}</Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Box className="modal-footer"
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pb: 2,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {selectedOperators.length} operators selected
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button className="btn btn-outlined" onClick={() => setAddOperator(false)}>
                                Cancel
                            </Button>
                            <Button className="btn btn-blue" disabled={selectedOperators.length === 0} onClick={() => addOperators(selectedOperators)}>
                                Add Operators
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </CustomModal>
        </>
    );
};

export default OperatorsTab;