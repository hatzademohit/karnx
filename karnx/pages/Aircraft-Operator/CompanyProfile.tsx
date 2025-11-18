"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Link, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { CustomTextField, CustomModal, AutoComplteCheckbox } from '@/components';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import PreviewIcon from '@mui/icons-material/Preview';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import Face6Icon from '@mui/icons-material/Face6';
import ContactsIcon from '@mui/icons-material/Contacts';
import useApiFunction from '@/karnx/Hooks/useApiFunction';
import { apiBaseUrl } from '@/karnx/api';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/context/AuthContext';

const labelSx = { color: '#6b7280', fontSize: 14 };

const ReadOnlyRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Stack>
        <Typography sx={labelSx}>{label}</Typography>
        <Typography>{value}</Typography>
    </Stack>
);

export default function CompanyProfile() {
    const callApi = useApiFunction();
    const { user } = useAuth();
    // Main profile state
    const theme = useTheme()
    const [editing, setEditing] = useState(false);
    const [selectedOption, setSelectedOption] = useState<any>();
    const [previewProfile, setPreviewProfile] = useState(false);
    const [profile, setProfile] = useState<any>({ client: {}, regionCities: [], rating: 0, totalFlights: 0, totalAircraft: 0 });

    // Form buffer while editing
    const [draft, setDraft] = useState<any>({ client: {}, regionCities: [], rating: 0, totalFlights: 0, totalAircraft: 0 });
    const getProfileData = async () => {
        const getData = await callApi({ method: 'GET', url: `${apiBaseUrl}/clients/${user?.client_id}` });
        if (getData?.status === true) {
            setProfile(getData.data);
            setSelectedOption(getData?.data?.regionCities.filter((o: any) => getData?.data?.client.operating_reginons.includes(o?.id)));
            // Avoid overwriting local edits while editing; only refresh draft when not editing
            if (!editing) {
                setDraft(getData.data);
            }
        } else {
            toast.error(getData?.message || '');
        }
    };

    const startEdit = async () => {
        setSelectedOption(profile?.regionCities.filter((o: any) => draft.client.operating_reginons.includes(o?.id)));
        setEditing(true);
    };
    const cancelEdit = () => {
        setSelectedOption(profile.regionCities.filter((o: any) => profile.client.operating_reginons.includes(o?.id)));
        setEditing(false);
    };
    const save = async () => {
        try {
            const payload = draft;
            const updated = await callApi({ method: 'PUT', url: `${apiBaseUrl}/clients/${user?.client_id}`, body: payload?.client });
            if (updated?.status === true) {
                toast.success(updated?.message);
                await getProfileData();
                setEditing(false);
            } else {
                toast.error(updated?.message);
            }
        } catch (e) {
            toast.error('Error updating profile 100');
        }
    };

    const viewProfile = () => {
        setPreviewProfile(true)
    }

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <>
            <Stack direction="row" spacing={1} mb={2} justifyContent='space-between' alignItems='center'>
                <Typography variant='h3' sx={{ color: theme?.heading?.color, mb: theme?.heading?.marginBottom }}>Company Profile</Typography>
                {editing ? (
                    <Box>
                        <Tooltip title="Save">
                            <IconButton color="primary" onClick={save}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel" sx={{ ml: 1 }}>
                            <IconButton onClick={cancelEdit}>
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ) : (
                    <Box>
                        <Tooltip title="Preview Profile">
                            <IconButton onClick={viewProfile}>
                                <PreviewIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Profile">
                            <IconButton onClick={startEdit}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Stack>
            <Box sx={{ border: '1px solid #cccccc', padding: 2 }}>
                <Grid container spacing={2}>
                    {/* Flight Informtaion */}
                    <Grid size={{ sm: 12, xs: 12 }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', color: theme?.common?.redColor, textDecoration: 'underline' }}>Flight Information</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
                            <ReadOnlyRow label="Rating" value={`${profile?.rating ?? 0} ★`} />
                            <ReadOnlyRow label="Total Flights" value={`${profile?.totalFlights ?? 0} flights`} />
                            <ReadOnlyRow label="Total Aircraft" value={`🛧 ${profile?.totalAircraft ?? 0}`} />
                        </Stack>
                    </Grid>
                    <Grid size={{ sm: 12, xs: 12 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Company Name"
                                    placeholder="Enter company name"
                                    value={(editing ? draft?.client?.name : profile?.client?.name) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, name: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Safety and Response Time */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Safety Rating"
                                    placeholder="e.g., ARGUS Gold, Wyvern Wingman"
                                    value={(editing ? draft?.client?.safety_ratings : profile?.client?.safety_ratings) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, safety_ratings: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            {/* Response Time */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Response Time"
                                    placeholder="e.g., < 2 hours"
                                    value={(editing ? draft?.client?.response_time : profile?.client?.response_time) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, response_time: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Operating Regions */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <AutoComplteCheckbox
                                    inputLabel="Operating Regions"
                                    options={profile?.regionCities}
                                    value={selectedOption}
                                    onChange={(selected: any) => {
                                        setSelectedOption(selected)
                                        setDraft({ ...draft, client: { ...draft.client, operating_reginons: selected.map((val) => val.id) } });
                                    }}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Certifications */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Certifications"
                                    placeholder="e.g., Argus Gold, IS-BAO, Wyvern Wingman"
                                    value={(editing ? draft?.client?.certifications : profile?.client?.certifications) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, certifications: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Specialties */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Specialties"
                                    placeholder="e.g., Corporate Travel, VIP Transport"
                                    value={(editing ? draft?.client?.specialties : profile?.client?.specialties) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, specialties: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* divider */}
                    <Grid size={{ xs: 12 }}>
                        <Divider className='cust-divider' />
                    </Grid>
                    {/* Contact Informtion */}
                    <Grid size={{ sm: 12, xs: 12 }}>
                        <Typography variant='h4' sx={{ textAlign: 'center', color: theme?.common?.redColor, textDecoration: 'underline' }}>Contact Information</Typography>
                    </Grid>
                    <Grid size={{ sm: 12, xs: 12 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Contact Person"
                                    value={(editing ? draft?.client?.contact_person : profile?.client?.contact_person) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, contact_person: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Email"
                                    value={(editing ? draft?.client?.email : profile?.client?.email) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, email: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Phone"
                                    value={(editing ? draft?.client?.phone : profile?.client?.phone) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, phone: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Website"
                                    value={(editing ? draft?.client?.website : profile?.client?.website) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, website: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Address Line 1"
                                    value={(editing ? draft?.client?.address_line1 : profile?.client?.address_line1) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, address_line1: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Address Line 2"
                                    value={(editing ? draft?.client?.address_line2 : profile?.client?.address_line2) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, address_line2: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Area"
                                    value={(editing ? draft?.client?.area : profile?.client?.area) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, area: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="City"
                                    value={(editing ? draft?.client?.city : profile?.client?.city) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, city: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="State"
                                    value={(editing ? draft?.client?.state : profile?.client?.state) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, state: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Country"
                                    value={(editing ? draft?.client?.country : profile?.client?.country) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, country: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Pin Code"
                                    type="number"
                                    value={(editing ? draft?.client?.pincode : profile?.client?.pincode) ?? ''}
                                    onChange={(e: any) => setDraft({ ...draft, client: { ...draft.client, pincode: e.target.value } })}
                                    disabled={!editing}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingBlock: '10px',  }}>
                    {editing ? 
                        <>
                            <Button className='btn btn-blue' onClick={save}>Save</Button>
                            <Button className='btn btn-danger' onClick={cancelEdit}>Cancel</Button>
                        </>
                    :
                    <>
                        <Button className='btn btn-blue' onClick={viewProfile}>Preview</Button>
                        <Button className='btn btn-outlined' onClick={startEdit}>Edit</Button>
                    </>
                }
                </Box>
            </Box>

            <CustomModal open={previewProfile} setOpen={setPreviewProfile} headerText='Preview Profile' dataClose={() => setPreviewProfile(false)}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent className="card-content">
                        {/* header section */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton sx={{ backgroundColor: `${theme?.common?.blueColor} !important`, color: '#ffffff', borderRadius: '8px', width: '40px', height: '40px' }}>
                                <FlightOutlinedIcon />
                            </IconButton>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h4">{profile?.client?.name}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <StarOutlinedIcon sx={{ color: '#FFD700' }} />
                                    <Typography component="span" sx={{ fontFamily: 'poppins-semibold', fontSize: '14px', color: '#4D4D4D' }}>{profile?.rating}</Typography>
                                    <Typography component="span" sx={{ fontSize: '14px', color: '#4B5563', ml: 1 }}>{profile?.totalFlights} flights</Typography>
                                </Box>
                            </Box>
                        </Box>
                        {/* body section */}
                        <Grid container spacing={{ md: 2, xs: 1 }} sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LocalPoliceOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Safety Rating
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{profile?.client?.safety_ratings}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WatchLaterOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Response Time
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{`< ${profile?.client?.response_time}`}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <FlightOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Fleet Overview
                                </Typography>
                                <Typography sx={{ mt: 0.5 }} variant="h5">{profile?.totalAircraft} aircraft</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LanguageIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Operating Regions
                                </Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    {selectedOption && selectedOption?.map((region) => (
                                        <Typography key={region.id} component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>{region.title}</Typography>
                                    ))}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Certifications
                                </Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>{profile?.client?.certifications}</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <FolderSpecialIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Specialties
                                </Typography>
                                <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'flex-start', mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>{profile?.client?.specialties}</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Divider />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant='h5'>Contact Information</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <EmailOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Email
                                </Typography>
                                <Link href={profile?.email} sx={{ mt: 0.5 }} underline="none" color="text.secondary" variant="body2">
                                    {profile?.client?.email}
                                </Link>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <CallOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Phone
                                </Typography>
                                <Link href={`tel: ${profile?.client?.phone}`} sx={{ mt: 0.5 }} underline="none" color="text.secondary" variant="body2">
                                    {profile?.client?.phone}
                                </Link>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LaunchOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Website
                                </Typography>
                                <Link href={profile?.client?.website} sx={{ mt: 0.5 }} underline="none" color="text.secondary" variant="body2">
                                    {profile?.client?.website}
                                </Link>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <Face6Icon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Contact Person
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {profile?.client?.contact_person}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <ContactsIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Address
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {profile?.client?.address_line1}, {profile?.client?.address_line2 && `${profile?.client?.address_line2}, `}
                                    {profile?.client?.area}, {profile?.client?.city}, {profile?.client?.state}, {profile?.client?.country} - {profile?.client?.pincode}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CustomModal>
        </>
    );
}
