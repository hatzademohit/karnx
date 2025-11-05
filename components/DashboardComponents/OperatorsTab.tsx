import React, { useState } from "react";
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

interface OperatorsTabProps {
  inquiryData?: any;
}

const OperatorsTab: React.FC<OperatorsTabProps> = ({ inquiryData }) => {

    const theme = useTheme();
    const [addOperator, setAddOperator] = useState(false);
    const handleOpenAddOperator = () => {
        setAddOperator(true);
    }
    const [selectedOperators, setSelectedOperators] = useState<number[]>([]);

    const [operators, setOperators] = useState([
        {
            id: 1,
            name: "Platinum Jets International",
            rating: 4.8,
            flights: 2847,
            aircraft: 3,
            duration: "< 2 hours",
            tags: ["Luxury Travel", "Group Charters", "VIP Transport"],
        },
        {
            id: 2,
            name: "Global Charter Solutions",
            rating: 4.7,
            flights: 1456,
            aircraft: 4,
            duration: "< 3 hours",
            tags: ["Leisure Travel", "Family Charters"],
        },
    ]);

   const handleSelect = (id: number) => {
        setSelectedOperators((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

  return (
    <>
        {/* heading */}
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: '8px'}}>
            <Box>
                <Typography component='h4' variant="h4">Allocated Operators</Typography>
                <Typography sx={{color: '#4D4D4D'}}>2 operators assigned to this inquiry</Typography>
            </Box>
            <Box>
                <Button className="btn btn-danger" onClick={handleOpenAddOperator}>+ Add Operators</Button>
            </Box>
        </Box>

        {/* operators */}
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent className="card-content">
                        {/* header section */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton sx={{backgroundColor: `${theme?.common?.blueColor} !important`, color: '#ffffff', borderRadius: '8px', width: '40px', height: '40px'}}>
                                    <FlightOutlinedIcon />
                                </IconButton>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h4">Elite Aviation Services</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <StarOutlinedIcon sx={{color: '#FFD700'}} />
                                        <Typography component="span" sx={{fontFamily: 'poppins-semibold', fontSize: '14px', color: '#4D4D4D'}}> 4.9</Typography>
                                        <Typography component="span" sx={{fontSize: '14px', color: '#4B5563', ml: 1}}>2,847 flights</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <IconButton>
                                <ClearOutlinedIcon />
                            </IconButton>
                        </Box>
                        {/* body section */}
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LocalPoliceOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Safety Rating
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">ARGUS Gold</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WatchLaterOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Response Time
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{'< 2 hours'}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <FlightOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Fleet Overview
                                </Typography>
                                <Typography sx={{ mt: 0.5 }} variant="h5">6 aircraft</Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#E1F2FF' }}>1 Light</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#E1F2FF' }}>2 Mid-Size</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LanguageIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Operating Regions
                                </Typography>
                                <Typography sx={ {mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>Delhi</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>Mumbai</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>Pune</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Certifications
                                </Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>IS-BAO</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>Wyvern Wingman</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>ARGUS Gold</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Divider />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, '& a': { display: 'inline-flex', flexWrap: 'nowrap' } }}>
                                    <Box sx={{ display: 'flex', gap: '10px'}}>
                                        <Typography variant="body2" color="text.secondary">
                                            <Link
                                                href="mailto:info@example.com"
                                                underline="none"
                                                color="text.secondary"
                                            >
                                                <EmailOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Email
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Link
                                                href="tel:+919876543210"
                                                underline="none"
                                                color="text.secondary"
                                            >
                                                <CallOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Call
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Link
                                                href="https://example.com"
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
                                            <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>IS-BAO</Typography>
                                            <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>Wyvern Wingman</Typography>
                                            <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>ARGUS Gold</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent className="card-content">
                        {/* header section */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton sx={{backgroundColor: `${theme?.common?.blueColor} !important`, color: '#ffffff', borderRadius: '8px', width: '40px', height: '40px'}}>
                                    <FlightOutlinedIcon />
                                </IconButton>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h4">Elite Aviation Services</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <StarOutlinedIcon sx={{color: '#FFD700'}} />
                                        <Typography component="span" sx={{fontFamily: 'poppins-semibold', fontSize: '14px', color: '#4D4D4D'}}> 4.9</Typography>
                                        <Typography component="span" sx={{fontSize: '14px', color: '#4B5563', ml: 1}}>2,847 flights</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <IconButton>
                                <ClearOutlinedIcon />
                            </IconButton>
                        </Box>
                        {/* body section */}
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LocalPoliceOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Safety Rating
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">ARGUS Gold</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WatchLaterOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Response Time
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{'< 2 hours'}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <FlightOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Fleet Overview
                                </Typography>
                                <Typography sx={{ mt: 0.5 }} variant="h5">6 aircraft</Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#E1F2FF' }}>1 Light</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#E1F2FF' }}>2 Mid-Size</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LanguageIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Operating Regions
                                </Typography>
                                <Typography sx={ {mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>Delhi</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>Mumbai</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>Pune</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Certifications
                                </Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>IS-BAO</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>Wyvern Wingman</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>ARGUS Gold</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Divider />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, '& a': { display: 'inline-flex', flexWrap: 'nowrap' } }}>
                                    <Box sx={{ display: 'flex', gap: '10px'}}>
                                        <Typography variant="body2" color="text.secondary">
                                            <Link
                                                href="mailto:info@example.com"
                                                underline="none"
                                                color="text.secondary"
                                            >
                                                <EmailOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Email
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Link
                                                href="tel:+919876543210"
                                                underline="none"
                                                color="text.secondary"
                                            >
                                                <CallOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Call
                                            </Link>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Link
                                                href="https://example.com"
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
                                            <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>IS-BAO</Typography>
                                            <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>Wyvern Wingman</Typography>
                                            <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>ARGUS Gold</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <CustomModal headerText="Add Operator" open={addOperator} setOpen={setAddOperator} dataClose={() => setAddOperator(false)}>
            <Box>
                {operators.map((op) => (
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
                                        <IconButton sx={{backgroundColor: `${theme?.common?.blueColor} !important`, color: '#ffffff', borderRadius: '8px', width: '40px', height: '40px'}}>
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
                                        {op.tags.map((tag) => (
                                            <Typography key={tag} component="span" className="custom-pill" sx={{ backgroundColor: '#f4f5f7' }}>{tag}</Typography>
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
                        <Button className="btn btn-blue" disabled={selectedOperators.length === 0}>
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