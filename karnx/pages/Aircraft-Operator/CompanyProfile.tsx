"use client"
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Link, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { CustomModal, AutoComplteCheckbox, RHFCustomTextField } from '@/components';
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
import { useForm, FormProvider, Controller, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyProfileSchema } from '@/utils/ValidationSchema';
import MuiLink from "@mui/material/Link";

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
            setSelectedOption(getData?.data?.regionCities.filter((o: any) => (getData?.data?.client.operating_reginons ?? []).includes(o?.id)));
            // Avoid overwriting local edits while editing; only refresh draft when not editing
            if (!editing) {
                console.log(getData.data);
                setDraft(getData.data);
            }
        } else {
            toast.error(getData?.message || '');
        }
    };

    const startEdit = async () => {
        setSelectedOption(profile?.regionCities.filter((o: any) => (draft?.client?.operating_reginons ?? []).includes(o?.id)));
        setEditing(true);
    };
    const cancelEdit = () => {
        setSelectedOption(profile.regionCities.filter((o: any) => (profile.client.operating_reginons ?? []).includes(o?.id)));
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

    const methods = useForm({
        resolver: yupResolver(CompanyProfileSchema),
        mode: "onChange"
    });
    const { handleSubmit, reset, control, formState: { errors } } = methods;

    useEffect(() => {
        if (profile?.client) {
            reset({
                clientName: (editing ? draft?.client?.name : profile?.client?.name) ?? '',
                safetyRating: (editing ? draft?.client?.safety_ratings : profile?.client?.safety_ratings) ?? '',
                responseTime: (editing ? draft?.client?.response_time : profile?.client?.response_time) ?? '',
                operatingRegions: (editing ? draft?.client?.operating_reginons : profile?.client?.operating_reginons) ?? [],
                certification: (editing ? draft?.client?.certifications : profile?.client?.certifications) ?? '',
                specialtie: (editing ? draft?.client?.specialties : profile?.client?.specialties) ?? '',
                contactPerson: (editing ? draft?.client?.contact_person : profile?.client?.contact_person) ?? '',
                email: (editing ? draft?.client?.email : profile?.client?.email) ?? '',
                phone: (editing ? draft?.client?.phone : profile?.client?.phone) ?? '',
                website: (editing ? draft?.client?.website : profile?.client?.website) ?? '',
                addressLine1: (editing ? draft?.client?.address_line1 : profile?.client?.address_line1) ?? '',
                addressLine2: (editing ? draft?.client?.address_line2 : profile?.client?.address_line2) ?? '',
                area: (editing ? draft?.client?.area : profile?.client?.area) ?? '',
                city: (editing ? draft?.client?.city : profile?.client?.city) ?? '',
                state: (editing ? draft?.client?.state : profile?.client?.city) ?? '',
                country: (editing ? draft?.client?.country : profile?.client?.country) ?? '',
                pinCode: (editing ? draft?.client?.pincode : profile?.client?.pincode) ?? '',
            });
        }
    }, [profile, reset, editing]);

    const onSubmit = (data) => {
        save()
    };

    return (
        <FormProvider {...methods}>
            <Stack direction="row" spacing={1} mb={2} justifyContent='space-between' alignItems='center'>
                <Typography variant='h3' sx={{ color: theme?.heading?.color, mb: theme?.heading?.marginBottom }}>Company Profile</Typography>
                {editing ? (
                    <Box>
                        <Tooltip title="Save">
                            <IconButton color="primary" onClick={handleSubmit(onSubmit)}>
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
            <Typography component='form' onSubmit={handleSubmit(onSubmit)} sx={{ border: '1px solid #cccccc', padding: '16px' }}>
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
                                <RHFCustomTextField
                                    name='clientName'
                                    label="Company Name"
                                    placeholder="Enter company name"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, name: val } })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Safety Rating */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='safetyRating'
                                    label="Safety Rating"
                                    placeholder="e.g., ARGUS Gold, Wyvern Wingman"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, safety_ratings: val } })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Response Time */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='responseTime'
                                    label="Response Time"
                                    placeholder="e.g., < 2 hours"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, response_time: val } })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Operating Regions */}
                            {/* <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <Controller name='operatingRegions' control={control} render={({ field }) =>{
                                    // console.log(field.value)
                                return(
                                    <AutoComplteCheckbox
                                        inputLabel="Operating Regions"
                                        options={profile?.regionCities}
                                        value={selectedOption}
                                        onChange={(selected: any) => {
                                            setSelectedOption(selected)
                                            setDraft({ ...draft, client: { ...draft.client, operating_reginons: selected.map((val) => val.id) } });
                                        }}
                                        disabled={!editing}
                                        error={!!errors.operatingRegions}
                                        helperText={errors?.operatingRegions?.message as string}

                                    />
                                )}}/>
                            </Grid> */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <Controller
                                    name="operatingRegions"
                                    control={control}
                                    render={({ field }) => (
                                        <AutoComplteCheckbox
                                            inputLabel="Operating Regions"
                                            options={profile?.regionCities}
                                            value={profile?.regionCities?.filter((city) =>
                                                field.value.includes(city.id)
                                            )
                                            }
                                            onChange={(selected) => {
                                                field.onChange(selected.map((val) => val.id));
                                                setDraft({
                                                    ...draft,
                                                    client: {
                                                        ...draft.client,
                                                        operating_reginons: selected.map((v) => v.id),
                                                    },
                                                });
                                            }}
                                            disabled={!editing}
                                            error={!!errors.operatingRegions}
                                            helperText={errors?.operatingRegions?.message as string}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Certifications */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='certification'
                                    label="Certifications"
                                    placeholder="e.g., Argus Gold, IS-BAO, Wyvern Wingman"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, certifications: val } })}
                                    disabled={!editing}
                                />
                            </Grid>

                            {/* Specialties */}
                            <Grid size={{ md: 4, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='specialtie'
                                    label="Specialties"
                                    placeholder="e.g., Corporate Travel, VIP Transport"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, specialties: val } })}
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
                                <RHFCustomTextField
                                    name='contactPerson'
                                    label="Contact Person"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, contact_person: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='email'
                                    label="Email"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, email: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='phone'
                                    label="Phone"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, phone: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='website'
                                    label="Website"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, website: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='addressLine1'
                                    label="Address Line 1"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, address_line1: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='addressLine2'
                                    label="Address Line 2"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, address_line2: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='area'
                                    label="Area"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, area: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='city'
                                    label="City"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, city: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='state'
                                    label="State"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, state: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='country'
                                    label="Country"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, country: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                            <Grid size={{ md: 3, sm: 6, xs: 12 }}>
                                <RHFCustomTextField
                                    name='pinCode'
                                    label="Pin Code"
                                    onValueChange={(val: any) => setDraft({ ...draft, client: { ...draft.client, pincode: val } })}
                                    disabled={!editing}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingBlock: '10px', }}>
                    {editing ?
                        <>
                            <Button className='btn btn-blue' type="submit">Save</Button>
                            <Button className='btn btn-danger' onClick={cancelEdit}>Cancel</Button>
                        </>
                        :
                        <>
                            <Button className='btn btn-blue' onClick={viewProfile}>Preview</Button>
                            <Button className='btn btn-outlined' onClick={startEdit}>Edit</Button>
                        </>
                    }
                </Box>
            </Typography>

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
                                <Link href={`mailto:${profile?.client?.email}`} sx={{ mt: 0.5 }} underline="none" color="text.secondary" variant="body2">
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
                                <MuiLink href={`https://${profile?.client?.website}`} target="_blank" variant="body2" sx={{ mt: 0.5 }}>
                                    {profile?.client?.website}
                                </MuiLink>
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
        </FormProvider>
    );
}
