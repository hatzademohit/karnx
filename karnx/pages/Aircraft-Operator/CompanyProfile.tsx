"use client"
import React, { useMemo, useState } from 'react';
import { Box, Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
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

import { CustomTextField } from '../../../components/CustomTextField/CustomTextField';
import SingleSelect from '../../../components/SelectOption/SingleSelect';
import MultiSelectCheckbox from '../../../components/SelectOption/MultiSelectCheckbox';
import PageInfoBox from '../../../components/PageInfoBox/PageInfoBox';
import InfoCard from '../../../components/InfoCard/InfoCard';

// Local mock options. Replace with API data via hooks when backend is ready.
const regionOptions = ['Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai'];
const certOptions = ['IS-BAO', 'Wyvern Wingman', 'ARGUS Gold', 'IOSA'];
const specOptions = ['Corporate Travel', 'VIP Transport', 'Medical Evac', 'Sports Charter', 'Film Crew'];

const labelSx = { color: '#6b7280', fontSize: 13 };

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
        <Box color="#1f2937">{icon}</Box>
        <Typography fontWeight={600}>{title}</Typography>
    </Stack>
);

const ReadOnlyRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Stack spacing={0.5}>
        <Typography sx={labelSx}>{label}</Typography>
        <Typography fontWeight={600}>{value}</Typography>
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
        responseTime: '< 2 hours',
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
    });

    // Form buffer while editing
    const [draft, setDraft] = useState(profile);

    const startEdit = () => {
        setDraft(profile);
        setEditing(true);
    };
    const cancelEdit = () => setEditing(false);
    const save = () => {
        setProfile(draft);
        setEditing(false);
    };

    const regionsMemo = useMemo(() => regionOptions.map(r => ({ label: r, value: r })), []);
    const certsMemo = useMemo(() => certOptions.map(r => ({ label: r, value: r })), []);
    const specsMemo = useMemo(() => specOptions.map(r => ({ label: r, value: r })), []);

    return (
        <Stack spacing={2}>
            {/* <PageInfoBox title="Company Profile" subtitle="Operator details and capabilities" /> */}

            <InfoCard>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={1.5}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                {editing ? (
                                    <CustomTextField
                                        label="Company Name"
                                        placeholder="Enter company name"
                                        value={draft.companyName}
                                        onChange={(e: any) => setDraft({ ...draft, companyName: e.target.value })}
                                    />
                                ) : (
                                    <Typography variant="h6" fontWeight={700}>
                                        {profile.companyName}
                                    </Typography>
                                )}

                                <Stack direction="row" spacing={1}>
                                    {editing ? (
                                        <>
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
                                        </>
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

                            {/* Safety and Response Time */}
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <SectionHeader icon={<ShieldOutlinedIcon fontSize="small" />} title="Safety Rating" />
                                    {editing ? (
                                        <SingleSelect
                                            label="Safety Rating"
                                            value={draft.safetyRating}
                                            options={certOptions.map(c => ({ label: c, value: c }))}
                                            onChange={(val: any) => setDraft({ ...draft, safetyRating: val })}
                                        />
                                    ) : (
                                        <Typography fontWeight={700}>{profile.safetyRating}</Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SectionHeader icon={<AccessTimeOutlinedIcon fontSize="small" />} title="Response Time" />
                                    {editing ? (
                                        <CustomTextField
                                            label="Response Time"
                                            placeholder="e.g., < 2 hours"
                                            value={draft.responseTime}
                                            onChange={(e: any) => setDraft({ ...draft, responseTime: e.target.value })}
                                        />
                                    ) : (
                                        <Typography fontWeight={700}>{profile.responseTime}</Typography>
                                    )}
                                </Grid>
                            </Grid>

                            {/* Fleet Overview */}
                            <Box>
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
                            </Box>

                            {/* Operating Regions */}
                            <Box>
                                <SectionHeader icon={<RoomOutlinedIcon fontSize="small" />} title="Operating Regions" />
                                {editing ? (
                                    <MultiSelectCheckbox
                                        label="Select Regions"
                                        options={regionsMemo}
                                        value={draft.regions}
                                        onChange={(val: string[]) => setDraft({ ...draft, regions: val })}
                                    />
                                ) : (
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {profile.regions.map((r) => (
                                            <Chip key={r} label={r} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                                        ))}
                                    </Stack>
                                )}
                            </Box>

                            {/* Certifications */}
                            <Box>
                                <SectionHeader icon={<EmojiEventsOutlinedIcon fontSize="small" />} title="Certifications" />
                                {editing ? (
                                    <MultiSelectCheckbox
                                        label="Select Certifications"
                                        options={certsMemo}
                                        value={draft.certifications}
                                        onChange={(val: string[]) => setDraft({ ...draft, certifications: val })}
                                    />
                                ) : (
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {profile.certifications.map((c) => (
                                            <Chip key={c} label={c} color="success" variant="outlined" size="small" sx={{ mr: 1, mb: 1, bgcolor: '#EAF7EE' }} />
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Contact + Specialties */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={2}>
                            <InfoCard variant="soft">
                                <Stack spacing={2}>
                                    <SectionHeader icon={<MailOutlineIcon fontSize="small" />} title="Contact" />
                                    {editing ? (
                                        <Stack spacing={1.5}>
                                            <CustomTextField
                                                label="Email"
                                                value={draft.email}
                                                onChange={(e: any) => setDraft({ ...draft, email: e.target.value })}
                                            />
                                            <CustomTextField
                                                label="Phone"
                                                value={draft.phone}
                                                onChange={(e: any) => setDraft({ ...draft, phone: e.target.value })}
                                            />
                                            <CustomTextField
                                                label="Website"
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
                            </InfoCard>

                            <InfoCard variant="soft">
                                <Stack spacing={1.5}>
                                    <SectionHeader icon={<EmojiEventsOutlinedIcon fontSize="small" />} title="Specialties" />
                                    {editing ? (
                                        <MultiSelectCheckbox
                                            label="Select Specialties"
                                            options={specsMemo}
                                            value={draft.specialties}
                                            onChange={(val: string[]) => setDraft({ ...draft, specialties: val })}
                                        />
                                    ) : (
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {profile.specialties.map((s) => (
                                                <Chip key={s} label={s} size="small" sx={{ bgcolor: '#FEF3C7', color: '#92400E', mr: 1, mb: 1 }} />
                                            ))}
                                        </Stack>
                                    )}
                                </Stack>
                            </InfoCard>
                        </Stack>
                    </Grid>
                </Grid>
            </InfoCard>
        </Stack>
    );
}
