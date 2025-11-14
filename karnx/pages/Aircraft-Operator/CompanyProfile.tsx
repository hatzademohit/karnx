"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Divider, Grid, IconButton, Link, MenuItem, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { CustomTextField, SingleSelect, MultiSelectCheckbox, CustomModal } from '@/components';
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

// Local mock options. Replace with API data via hooks when backend is ready.
const regionOptions = ['Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai'];
const certOptions = ['IS-BAO', 'Wyvern Wingman', 'ARGUS Gold', 'IOSA'];
const specOptions = ['Corporate Travel', 'VIP Transport', 'Medical Evac', 'Sports Charter', 'Film Crew'];

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
    const [previewProfile, setPreviewProfile] = useState(false);
    const [profile, setProfile] = useState<any>({ client: {}, regionCities: [], rating: 0, totalFlights: 0, totalAircraft: 0 });
    // const [profile, setProfile] = useState({
    //     companyName: 'Elite Aviation Services',
    //     rating: 4.9,
    //     flights: 2847,
    //     safetyRating: 'ARGUS Gold',
    //     responseTime: '2 hours',
    //     fleetTotal: 6,
    //     fleetBreakup: [
    //         { label: 'Light', count: 1, color: 'info' as const },
    //         { label: 'Mid-Size', count: 2, color: 'success' as const },
    //     ],
    //     regions: ['Delhi', 'Mumbai', 'Pune'] as string[],
    //     certifications: ['IS-BAO', 'Wyvern Wingman', 'ARGUS Gold'] as string[],
    //     email: 'ops@eliteaviation.com',
    //     phone: '+91 98XXXXXX10',
    //     website: 'www.eliteaviation.com',
    //     specialties: ['Corporate Travel', 'VIP Transport'] as string[],

    //     contactPerson: 'John Deo',
    //     addressLine1: '123 Main St',
    //     addressLine2: '158',
    //     area: 'Delhi',
    //     city: 'Delhi',
    //     state: 'Maharashtra',
    //     country: 'India',
    //     pinCode: 110001,
    //     selectedSection: 'Overview',
    // });

    // Form buffer while editing
    const [draft, setDraft] = useState<any>({ client: {}, regionCities: [], rating: 0, totalFlights: 0, totalAircraft: 0 });
    const getProfileData = async () => {
        const getData = await callApi({ method: 'GET', url: `${apiBaseUrl}/clients/${user?.client_id}` });
        console.log(getData.data);
        if (getData?.status === true) {
            setProfile(getData.data);
            setDraft(getData.data);
        } else {
            toast.error(getData?.message || '');
        }
    };

    const startEdit = async () => {
        setEditing(true);
    };
    const cancelEdit = () => setEditing(false);
    const save = async () => {
        try {
            const payload = draft;
            // const updated = await callApi({ method: 'PUT', url: `${apiBaseUrl}/clients`, body: payload });
            // if (updated?.status === true) {
            //     toast.success(updated?.message || 'Profile updated successfully');
            //     setProfile(payload);
            //     setEditing(false);
            // } else {
            //     toast.error(updated?.message || 'Error updating profile');
            // }
        } catch (e) {
            toast.error('Error updating profile');
        }
        // console.log(draft, 'draft')
    };

    const viewProfile = () => {
        setPreviewProfile(true)
    }

    useEffect(() => {
        getProfileData();
    }, []);

    // useEffect(() => {
    //     setDraft(profile);
    // }, [profile]);

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
                                    placeholder="e.g., ARGUS Gold"
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
                            {/* <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <MultiSelectCheckbox
                                    inputLabel="Operating Regions"
                                    label=''
                                    options={profile?.regionCities ?? []}
                                    value={profile?.client?.operating_reginons || []}
                                    onChange={(val: string[]) => setDraft({ ...draft, operating_reginons: val })}
                                    size='small'
                                    width='100%'
                                    disabled={!editing}
                                />
                            </Grid> */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <MultiSelectCheckbox
                                    inputLabel="Operating Regions"
                                    label=""
                                    options={profile?.regionCities}
                                    value={(editing ? draft?.client?.operating_reginons : profile?.client?.operating_reginons) ?? []}
                                    onChange={(val: string[]) => setDraft({ ...draft, client: { ...draft.client, operating_reginons: val } })}
                                    size="small" width="100%"
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Certifications */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Certifications"
                                    placeholder="e.g., Argus Gold"
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
            </Box>
        </>
    );
}
