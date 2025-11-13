"use client"
import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, Chip, Divider, Grid, IconButton, Link, MenuItem, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import FlightClassOutlinedIcon from '@mui/icons-material/FlightClassOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { CustomTextField, SingleSelect, MultiSelectCheckbox, CustomModal } from '@/components';
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
import PreviewIcon from '@mui/icons-material/Preview';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import Face6Icon from '@mui/icons-material/Face6';
import ContactsIcon from '@mui/icons-material/Contacts';

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
    // Main profile state
    const theme = useTheme()
    const [editing, setEditing] = useState(false);
    const [previewProfile, setPreviewProfile] = useState(false);
    const [profile, setProfile] = useState({
        companyName: 'Elite Aviation Services',
        rating: 4.9,
        flights: 2847,
        safetyRating: 'ARGUS Gold',
        responseTime: '2 hours',
        fleetTotal: 6,
        fleetBreakup: [
            { label: 'Light', count: 1, color: 'info' as const },
            { label: 'Mid-Size', count: 2, color: 'success' as const },
        ],
        regions: ['Delhi', 'Mumbai', 'Pune'] as string[],
        certifications: ['IS-BAO', 'Wyvern Wingman', 'ARGUS Gold'] as string[],
        email: 'ops@eliteaviation.com',
        phone: '+91 98XXXXXX10',
        website: 'www.eliteaviation.com',
        specialties: ['Corporate Travel', 'VIP Transport'] as string[],

        contactPerson: 'John Deo',
        addressLine1: '123 Main St',
        addressLine2: '158',
        area: 'Delhi',
        city: 'Delhi',
        state: 'Maharashtra',
        country: 'India',
        pinCode: 110001,
        selectedSection: 'Overview',
    });

    // Form buffer while editing
    const [draft, setDraft] = useState(profile);
    const sectionOptions = useMemo(() => [
        'Overview',
        'Safety',
        'Fleet',
        'Regions',
        'Certifications',
        'Contact',
        'Specialties',
    ], []);

    const startEdit = () => {
        setDraft(profile);
        setEditing(true);
    };
    const cancelEdit = () => setEditing(false);
    const save = () => {
        setProfile(draft);
        setEditing(false);
    };

    const viewProfile = () => {
        setPreviewProfile(true)
    }

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
                        {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
                            <ReadOnlyRow label="Rating" value={`${profile.rating} ★`} />
                            <ReadOnlyRow label="Total Flights" value={`${profile.flights.toLocaleString()} flights`} />
                        </Stack> */}
                    </Grid>
                    <Grid size={{ sm: 12, xs: 12 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Company Name"
                                    placeholder="Enter company name"
                                    value={draft.companyName}
                                    onChange={(e: any) => setDraft({ ...draft, companyName: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <SingleSelect
                                    value={draft.selectedSection}
                                    onChange={(e: any) => setDraft({ ...draft, selectedSection: e?.target?.value })}
                                    size='small'
                                    inputLabel='Selected Section'
                                    disabled={!editing}
                                >
                                    {sectionOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </SingleSelect>
                            </Grid>

                            {/* Safety and Response Time */}
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <SingleSelect
                                    value={draft.safetyRating}
                                    onChange={(e: any) => setDraft({ ...draft, safetyRating: e?.target?.value })}
                                    size='small'
                                    inputLabel='Safety Rating'
                                    disabled={!editing}
                                >
                                    {certOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </SingleSelect>
                            </Grid>
                            {/* Response Time */}
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Response Time"
                                    placeholder="e.g., < 2 hours"
                                    value={draft.responseTime}
                                    onChange={(e: any) => setDraft({ ...draft, responseTime: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Fleet Overview */}
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    type="number"
                                    inputLabel="Total Aircraft"
                                    value={draft.fleetTotal}
                                    onChange={(e: any) => setDraft({ ...draft, fleetTotal: Number(e.target.value) })}
                                    disabled={!editing}
                                />
                            </Grid>
                            {/* Operating Regions */}
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <MultiSelectCheckbox
                                    inputLabel="Operating Regions"
                                    label=''
                                    options={regionOptions}
                                    value={draft.regions}
                                    onChange={(val: string[]) => setDraft({ ...draft, regions: val })}
                                    size='small'
                                    width='100%'
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Certifications */}
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <MultiSelectCheckbox
                                    label=""
                                    options={certOptions}
                                    value={draft.certifications}
                                    onChange={(val: string[]) => setDraft({ ...draft, certifications: val })}
                                    size='small'
                                    width='100%'
                                    inputLabel='Certifications'
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Specialties */}
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <MultiSelectCheckbox
                                    label=""
                                    inputLabel='Specialties'
                                    options={specOptions}
                                    value={draft.specialties}
                                    onChange={(val: string[]) => setDraft({ ...draft, specialties: val })}
                                    width='100%'
                                    size='small'
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
                                    value={draft.contactPerson}
                                    onChange={(e: any) => setDraft({ ...draft, contactPerson: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Email"
                                    value={draft.email}
                                    onChange={(e: any) => setDraft({ ...draft, email: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Phone"
                                    value={draft.phone}
                                    onChange={(e: any) => setDraft({ ...draft, phone: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Website"
                                    value={draft.website}
                                    onChange={(e: any) => setDraft({ ...draft, website: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Address Line 1"
                                    value={draft.addressLine1}
                                    onChange={(e: any) => setDraft({ ...draft, addressLine1: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Address Line 2"
                                    value={draft.addressLine2}
                                    onChange={(e: any) => setDraft({ ...draft, addressLine2: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Area"
                                    value={draft.area}
                                    onChange={(e: any) => setDraft({ ...draft, area: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="City"
                                    value={draft.city}
                                    onChange={(e: any) => setDraft({ ...draft, city: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="State"
                                    value={draft.state}
                                    onChange={(e: any) => setDraft({ ...draft, state: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Country"
                                    value={draft.country}
                                    onChange={(e: any) => setDraft({ ...draft, country: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <CustomTextField
                                    inputLabel="Pin Code"
                                    type="number"
                                    value={draft.pinCode}
                                    onChange={(e: any) => setDraft({ ...draft, pinCode: e.target.value })}
                                    disabled={!editing}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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
                                <Typography variant="h4">{profile?.companyName}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <StarOutlinedIcon sx={{ color: '#FFD700' }} />
                                    <Typography component="span" sx={{ fontFamily: 'poppins-semibold', fontSize: '14px', color: '#4D4D4D' }}>{profile?.rating}</Typography>
                                    <Typography component="span" sx={{ fontSize: '14px', color: '#4B5563', ml: 1 }}>{profile?.flights}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        {/* body section */}
                        <Grid container spacing={{ md: 2, xs: 1 }} sx={{ mt: 2 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LocalPoliceOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Safety Rating
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{profile?.safetyRating}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WatchLaterOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Response Time
                                </Typography>
                                <Typography sx={{ fontFamily: "poppins-md", mt: 0.5 }} variant="h5">{`< ${profile?.responseTime}`}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <FlightOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Fleet Overview
                                </Typography>
                                <Typography sx={{ mt: 0.5 }} variant="h5">{profile?.fleetTotal} aircraft</Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#E1F2FF' }}>{profile?.fleetBreakup[0]?.label}</Typography>
                                    <Typography component="span" className="custom-pill" sx={{ backgroundColor: '#E1F2FF' }}>{profile?.fleetBreakup[1]?.label}</Typography>
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LanguageIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Operating Regions
                                </Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    {profile?.regions.map((city) => (
                                        <Typography key={city} component="span" className="custom-pill" sx={{ backgroundColor: '#F3F4F6' }}>{city}</Typography>
                                    ))}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <WorkspacePremiumOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} /> Certifications
                                </Typography>
                                <Typography sx={{ mt: 0.5 }}>
                                    {profile?.certifications.map((certification) => (
                                        <Typography key={certification} component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>{certification}</Typography>
                                    ))}
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <FolderSpecialIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Specialties
                                </Typography>
                                <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'flex-start', mt: 0.5 }}>
                                    {profile?.specialties.map((specialtie) => (
                                        <Typography key={specialtie} component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>{specialtie}</Typography>
                                    ))}
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
                                    {profile?.email}
                                </Link>
                            </Grid>
                             <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <CallOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Phone
                                </Typography>
                                <Link href={`tel: ${profile?.phone}`} sx={{ mt: 0.5 }} underline="none" color="text.secondary" variant="body2">
                                    {profile?.phone}
                                </Link>
                            </Grid>
                             <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <LaunchOutlinedIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Website
                                </Typography>
                                <Link href={profile?.website} sx={{ mt: 0.5 }} underline="none" color="text.secondary" variant="body2">
                                    {profile?.website}
                                </Link>
                            </Grid>
                             <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <Face6Icon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Contact Person
                                </Typography>
                               <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {profile?.contactPerson}
                                </Typography>
                            </Grid>
                             <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <ContactsIcon sx={{ fontSize: 20, verticalAlign: 'middle', mr: 0.5 }} />
                                    Address
                                </Typography>
                               <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {profile.addressLine1}, {profile.addressLine2 && `${profile.addressLine2}, `}
                                    {profile.area}, {profile.city}, {profile.state}, {profile.country} - {profile.pinCode}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CustomModal>
        </>
    );
}
