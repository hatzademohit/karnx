"use client"
import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, Chip, Grid, IconButton, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import FlightClassOutlinedIcon from '@mui/icons-material/FlightClassOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { CustomTextField, SingleSelect, MultiSelectCheckbox } from '@/components';

// Local mock options. Replace with API data via hooks when backend is ready.
const regionOptions = ['Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai'];
const certOptions = ['IS-BAO', 'Wyvern Wingman', 'ARGUS Gold', 'IOSA'];
const specOptions = ['Corporate Travel', 'VIP Transport', 'Medical Evac', 'Sports Charter', 'Film Crew'];

const labelSx = { color: '#6b7280', fontSize: 14 };

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
        <Box sx={{ height: '20px' }} color="#1f2937">{icon}</Box>
        <Typography>{title}</Typography>
    </Stack>
);

const ReadOnlyRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Stack>
        <Typography sx={labelSx}>{label}</Typography>
        <Typography>{value}</Typography>
    </Stack>
);

export default function CompanyProfile() {
    // Main profile state
    const [editing, setEditing] = useState(false);
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

    return (
        <>
            <Box sx={{ border: '1px solid #cccccc', padding: 2 }}>
                <Grid container spacing={3}>
                    <Grid size={{ lg: 12, md: 12, xs: 12 }}>
                        <Stack spacing={1.5}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                {editing ? (
                                    <CustomTextField
                                        inputLabel="Company Name"
                                        placeholder="Enter company name"
                                        value={draft.companyName}
                                        onChange={(e: any) => setDraft({ ...draft, companyName: e.target.value })}
                                    />
                                ) : (
                                    <Typography variant="h4">
                                        {profile.companyName}
                                    </Typography>
                                )}

                                <Stack direction="row" spacing={1}>
                                    {editing ? (
                                        <Box sx={{ mt: '17px !important', display: 'flex' }}>
                                            <Tooltip title="Save">
                                                <IconButton color="primary" onClick={save}>
                                                    <SaveIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Cancel">
                                                <IconButton onClick={cancelEdit}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    ) : (
                                        <Tooltip title="Edit Profile">
                                            <IconButton onClick={startEdit}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>
                            </Stack>

                            {/* Rating and Flights */}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                <ReadOnlyRow label="Rating" value={`${profile.rating} ★`} />
                                <ReadOnlyRow label="Total Flights" value={`${profile.flights.toLocaleString()} flights`} />
                            </Stack>

                            {/* Selected Section */}
                            <Grid container spacing={3}>
                                <Grid size={{ sm: 6, xs: 12 }}>
                                    <SectionHeader icon={<ShieldOutlinedIcon fontSize="small" />} title="Selected Section" />
                                    {editing ? (
                                        <SingleSelect
                                            value={draft.selectedSection}
                                            onChange={(e: any) => setDraft({ ...draft, selectedSection: e?.target?.value })}
                                            size='small'
                                        >
                                            {sectionOptions.map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </SingleSelect>
                                    ) : (
                                        <Typography variant='h5'>{profile.selectedSection}</Typography>
                                    )}
                                </Grid>

                                {/* Safety and Response Time */}
                                <Grid size={{ sm: 6, xs: 12 }}>
                                    <SectionHeader icon={<ShieldOutlinedIcon fontSize="small" />} title="Safety Rating" />
                                    {editing ? (
                                        <SingleSelect
                                            value={draft.safetyRating}
                                            onChange={(e: any) => setDraft({ ...draft, safetyRating: e?.target?.value })}
                                            size='small'
                                        >
                                            {certOptions.map((option) => (
                                                <MenuItem value={option}>{option}</MenuItem>
                                            ))}
                                        </SingleSelect>
                                    ) : (
                                        <Typography variant='h5'>{profile.safetyRating}</Typography>
                                    )}
                                </Grid>
                                <Grid size={{ sm: 6, xs: 12 }}>
                                    <SectionHeader icon={<AccessTimeOutlinedIcon fontSize="small" />} title="Response Time" />
                                    {editing ? (
                                        <CustomTextField
                                            label="Response Time"
                                            placeholder="e.g., < 2 hours"
                                            value={draft.responseTime}
                                            onChange={(e: any) => setDraft({ ...draft, responseTime: e.target.value })}
                                        />
                                    ) : (
                                        <Typography variant='h5'>{profile.responseTime}</Typography>
                                    )}
                                </Grid>

                                {/* Fleet Overview */}
                                <Grid size={{ sm: 6, xs: 12 }}>
                                    <SectionHeader icon={<FlightClassOutlinedIcon fontSize="small" />} title="Fleet Overview" />
                                    <Stack spacing={0.5}>
                                        <Typography sx={labelSx}>Total Fleet</Typography>
                                        {editing ? (
                                            <CustomTextField
                                                type="number"
                                                label="Total Aircraft"
                                                value={draft.fleetTotal}
                                                onChange={(e: any) => setDraft({ ...draft, fleetTotal: Number(e.target.value) })}
                                            />
                                        ) : (
                                            <Typography fontWeight={600}>{`${profile.fleetTotal} aircraft`}</Typography>
                                        )}
                                        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                                            {(editing ? draft.fleetBreakup : profile.fleetBreakup).map((f, idx) => (
                                                <Chip key={idx} label={`${f.count} ${f.label}`} color={f.color} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Grid>

                                {/* Operating Regions */}
                                <Grid size={{ sm: 6, xs: 12 }}>
                                    <SectionHeader icon={<RoomOutlinedIcon fontSize="small" />} title="Operating Regions" />
                                    {editing ? (
                                        <MultiSelectCheckbox
                                            label=""
                                            options={regionOptions}
                                            value={draft.regions}
                                            onChange={(val: string[]) => setDraft({ ...draft, regions: val })}
                                            size='small'
                                            width='100%'
                                        />
                                    ) : (
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {profile.regions.map((r) => (
                                                <Chip key={r} label={r} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                                            ))}
                                        </Stack>
                                    )}
                                </Grid>

                                {/* Certifications */}
                                <Grid size={{ sm: 6, xs: 12 }}>
                                    <SectionHeader icon={<EmojiEventsOutlinedIcon fontSize="small" />} title="Certifications" />
                                    {editing ? (
                                        <MultiSelectCheckbox
                                            label=""
                                            options={certOptions}
                                            value={draft.certifications}
                                            onChange={(val: string[]) => setDraft({ ...draft, certifications: val })}
                                            size='small'
                                            width='100%'
                                        />
                                    ) : (
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {profile.certifications.map((c) => (
                                                <Chip key={c} label={c} color="success" variant="outlined" size="small" sx={{ mr: 1, mb: 1, bgcolor: '#EAF7EE' }} />
                                            ))}
                                        </Stack>
                                    )}
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    {/* Contact + Specialties */}
                    {/* <Grid size={{ md: 4, xs: 12 }}>
                        <Stack spacing={2}>
                            <SectionHeader icon={<MailOutlineIcon fontSize="small" />} title="Contact" />
                            {editing ? (
                                <Stack spacing={1.5}>
                                    <CustomTextField
                                        inputLabel="Email"
                                        value={draft.email}
                                        onChange={(e: any) => setDraft({ ...draft, email: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Phone"
                                        value={draft.phone}
                                        onChange={(e: any) => setDraft({ ...draft, phone: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Website"
                                        value={draft.website}
                                        onChange={(e: any) => setDraft({ ...draft, website: e.target.value })}
                                    />
                                </Stack>
                            ) : (
                                <Stack spacing={1}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <MailOutlineIcon fontSize="small" />
                                        <Typography>{profile.email}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <CallOutlinedIcon fontSize="small" />
                                        <Typography>{profile.phone}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LanguageOutlinedIcon fontSize="small" />
                                        <Typography>{profile.website}</Typography>
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                    </Grid> */}
                    <Grid size={{ lg: 12 }}>

                        <Stack spacing={1.5} mt={2}>
                            <SectionHeader icon={<EmojiEventsOutlinedIcon fontSize="small" />} title="Specialties" />
                            {editing ? (
                                <MultiSelectCheckbox
                                    label=""
                                    options={specOptions}
                                    value={draft.specialties}
                                    onChange={(val: string[]) => setDraft({ ...draft, specialties: val })}
                                    size='small'
                                />
                            ) : (
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {profile.specialties.map((s) => (
                                        <Chip key={s} label={s} size="small" sx={{ bgcolor: '#FEF3C7', color: '#92400E', mr: 1, mb: 1 }} />
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                        <Stack spacing={2}>
                            <SectionHeader icon={<MailOutlineIcon fontSize="small" />} title="Contact" />
                            {editing ? (
                                <Stack spacing={1.5}>
                                    <CustomTextField
                                        inputLabel="Contact Person"
                                        value={draft.contactPerson}
                                        onChange={(e: any) => setDraft({ ...draft, contactPerson: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Email"
                                        value={draft.email}
                                        onChange={(e: any) => setDraft({ ...draft, email: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Phone"
                                        value={draft.phone}
                                        onChange={(e: any) => setDraft({ ...draft, phone: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Website"
                                        value={draft.website}
                                        onChange={(e: any) => setDraft({ ...draft, website: e.target.value })}
                                    />

                                    <Typography sx={{ mt: 2, fontWeight: 600 }}>Address</Typography>
                                    <CustomTextField
                                        inputLabel="Address Line 1"
                                        value={draft.addressLine1}
                                        onChange={(e: any) => setDraft({ ...draft, addressLine1: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Address Line 2"
                                        value={draft.addressLine2}
                                        onChange={(e: any) => setDraft({ ...draft, addressLine2: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Area"
                                        value={draft.area}
                                        onChange={(e: any) => setDraft({ ...draft, area: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="City"
                                        value={draft.city}
                                        onChange={(e: any) => setDraft({ ...draft, city: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="State"
                                        value={draft.state}
                                        onChange={(e: any) => setDraft({ ...draft, state: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Country"
                                        value={draft.country}
                                        onChange={(e: any) => setDraft({ ...draft, country: e.target.value })}
                                    />
                                    <CustomTextField
                                        inputLabel="Pin Code"
                                        type="number"
                                        value={draft.pinCode}
                                        onChange={(e: any) => setDraft({ ...draft, pinCode: e.target.value })}
                                    />
                                </Stack>
                            ) : (
                                <Stack spacing={1.2}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography sx={labelSx}>Contact Person:</Typography>
                                        <Typography fontWeight={600}>{profile.contactPerson}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <MailOutlineIcon fontSize="small" />
                                        <Typography>{profile.email}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <CallOutlinedIcon fontSize="small" />
                                        <Typography>{profile.phone}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LanguageOutlinedIcon fontSize="small" />
                                        <Typography>{profile.website}</Typography>
                                    </Stack>

                                    <Typography sx={{ mt: 1, fontWeight: 600 }}>Address</Typography>
                                    <Typography>
                                        {profile.addressLine1}, {profile.addressLine2 && `${profile.addressLine2}, `}
                                        {profile.area}, {profile.city}, {profile.state}, {profile.country} - {profile.pinCode}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
