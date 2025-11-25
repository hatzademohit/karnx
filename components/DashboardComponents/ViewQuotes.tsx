import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, Divider, TableHead, Grid, Card, CardContent, useTheme, InputLabel, FormControl, TextField } from "@mui/material";
import { CustomModal, CustomTextField } from "@/components";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { useForm } from "react-hook-form";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import { apiBaseUrl, fileStorageUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import dayjs from "dayjs";
import { useAuth } from "@/app/context/AuthContext";

interface RejectionFormData {
    message: string;
}
interface PriceFormData {
    commissionPercentage: string;
}

const ViewQuotes = () => {
    const callApi = useApiFunction();
    const { inquiryId, setShowDetailsTabs } = useInquiryDetails();
    const [quotes, setQuotes] = useState([]);
    const [bestQuotes, setBestQuotes] = useState<any>(null);
    const [acceptedQuoteId, setAcceptedQuoteId] = useState<Number>(null);
    const [viewQuoteDetails, setViewQuoteDetails] = useState<boolean>(false);
    const [rejectionModal, setRejectionModal] = useState<boolean>(false);
    const [travelAgentModal, setTravelAgentModal] = useState<boolean>(false);
    const [viewedQuote, setViewedQuote] = useState<any>([]);
    const theme = useTheme();
    const { user } = useAuth();
    // {
    //     id: 3,
    //     departure: '08:30 - 17:00',
    //     return: '09:30 - 18:15',
    //     flightTime: "6h 30m",
    //     returnTime: "6h 35m",
    //     model: 'Dassault Falcon 8X',
    //     validityInYear: '2025',
    //     capacity: '19 Seats',
    //     range: '6,450 nm',
    //     speed: 'Mach 0.90',
    //     baseFire: "95,00,000",
    //     fluel: "25,00,000",
    //     taxes: "10,00,000",
    //     fees: '2,00,000',
    //     catering: '1,00,000',
    //     AdditionalServices: '45,000',
    //     aircraftAmenities: ['Wi-Fi tututu', 'In-seat power', 'Entertainment system', 'Conference area'],
    //     includedServices: ['Gourmet service', 'Exclusive travel itineraries', 'Concierge service'],
    // }

    const applyCurrencyFormat = (value: any) => {
        if (value == null) return '0';

        return value.toLocaleString("en-IN");
    };
    const openQuoteDetails = (quote: any) => {
        const { hours, minutes } = parseToHoursMinutes(quote.estimated_flight_time);
        const quoteViewData = {
            clientName: quote.client.name + ' · ' + quote.aircraft.asset_name,

            id: quote.id,
            departure: '08:30 - 17:00',
            return: '09:30 - 18:15',
            flightTime: hours + `h ` + minutes + `m`,
            returnTime: "6h 35m",
            model: quote.aircraft.aircraft_model,
            validityInYear: '2025',
            capacity: applyCurrencyFormat(quote.aircraft.capacity) + ' passangers',
            range: applyCurrencyFormat(quote.aircraft.flying_range) + ' nm',
            speed: 'Mach ' + applyCurrencyFormat(quote.aircraft.speed),

            baseFire: applyCurrencyFormat(quote.base_fare),
            fluelCost: applyCurrencyFormat(quote.fluel_cost),
            taxesFees: applyCurrencyFormat(quote.taxes_fees),
            crewFees: applyCurrencyFormat(quote.crew_fees),
            handlingFees: applyCurrencyFormat(quote.handling_fees),
            cateringFees: applyCurrencyFormat(quote.catering_fees),

            aircraftAmenities: quote?.available_amenities,//['Wi-Fi tututu', 'In-seat power', 'Entertainment system', 'Conference area'],
            includedServices: quote.special_offers_promotions,
            total: applyCurrencyFormat(quote.total),
            cancelationCondition: quote.cancelation_policy ? quote.cancelation_policy.name : '',
            additionalNotes: quote.additional_notes || '',
        };
        setViewedQuote(quoteViewData);
        setViewQuoteDetails(true);
    };

    const acceptQuote = (id) => {
        setAcceptedQuoteId(id);
    }

    const rejectQuote = (id) => {
        console.log('Reject quote id:' + id);
    }

    const quoteSendToTravelAgent = () => {
        setTravelAgentModal(true);
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RejectionFormData>({
        defaultValues: {
            message: "",
        },
    });

    const onSubmit = (data: RejectionFormData) => {
        console.log("Form Submitted:", data);
        setRejectionModal(false);
        reset();
    };

    const handleClose = () => {
        setRejectionModal(false);
        reset();
    };

    const {
        register: travelAgentRegister,
        handleSubmit: travelAgentHandleSubmit,
        formState: { errors: travelAgentErrors },
        reset: travelAgentReset,
    } = useForm<PriceFormData>({
        defaultValues: {
            commissionPercentage: "",
        },
    });

    const travelAgentSubmit = (data: PriceFormData) => {
        console.log("Submitted Data:", data);
        console.log("Quote ID:", viewedQuote?.id);
    };

    const handleCancel = () => {
        console.log("Cancelled quote id:", viewedQuote?.id);
        travelAgentReset();
    };

    const fetchQuotes = async () => {
        try {
            const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/inquiry-quotes/get-quoted-quotes/${inquiryId}` });
            if (res?.status === true) {
                setQuotes(res.data.quotes);
                setBestQuotes(res.data.best_quote);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            toast.error('Network error while fetching cancellation policies');
        }
    };

    useEffect(() => {
        fetchQuotes();
        //console.log(quotes);
    }, []);

    const acceptRejectQuote = async (quoteId: number, action: 'accept' | 'reject') => {
        // try {
        //     const token = localStorage.token;
        //     const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/accept-reject-quote`, body: { quoteId, action, inquiryId } });
        //     if (res?.status === true) {
        //         if (action === 'accept') {
        //             setAcceptedQuoteId(quoteId);
        //         } else {
        //             setRejectionModal(true);
        //         }
        //     } else {
        //         toast.error(res?.message || '');
        //     }
        // } catch (e) {
        //     toast.error('Network error while accepting/rejecting quote');
        // }
    };

    const parseToHoursMinutes = (value: any) => {
        if (value == null || value === "") return { hours: 0, minutes: 0 };
        let hours = 0;
        let minutes = 0;
        // If value contains colon → treat as HH:MM
        if (String(value).includes(":")) {
            const [h, m] = String(value).split(":");
            hours = parseInt(h) || 0;
            minutes = parseInt(m) || 0;
        } else {
            // Otherwise treat as decimal → 2.65 means 2 hours + (.65 * 60)
            const num = parseFloat(value);
            if (!isNaN(num)) {
                hours = Math.floor(num);
                minutes = Math.round((num - hours) * 60);
            }
        }
        // Normalize if minutes >= 60
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        }
        return { hours, minutes };
    }
    const renderRow = (label: string, key: keyof typeof quotes[0], isRich?: boolean) => (
        <TableRow>
            <TableCell sx={{ position: { md: 'sticky', xs: 'static' }, left: 0, backgroundColor: '#fafafa', zIndex: 1 }}>
                <Typography variant="h5" >{label}</Typography>
            </TableCell>
            {quotes.length > 0 && quotes.map((q) => {
                const isDisabled = acceptedQuoteId !== null && acceptedQuoteId !== q.id;
                //console.log(q[key]);
                return (
                    <TableCell key={q.id} sx={{ verticalAlign: "top" }} data-disabled={isDisabled}>
                        {label == 'Aircraft' ?
                            <>
                                <Typography color="text.secondary">
                                    {q[key].asset_name}
                                </Typography>
                                <Typography color="text.secondary" fontSize={12}>
                                    {q.aircraft.model_year} <b>·</b> {q.aircraft.capacity} Seats
                                </Typography>
                            </> :
                            label == 'Price' ?
                                <>
                                    <Typography color="text.secondary">
                                        {applyCurrencyFormat(q[key])}
                                    </Typography>
                                    <Typography color="#BC0019" fontSize={12}>
                                        {q.validate_till ? 'Valid until ' + dayjs(q.validate_till).format("DD-MMM-YYYY") : ''}
                                    </Typography>
                                </> :
                                label == 'Flight Time' ?
                                    <>
                                        {(() => {
                                            const ft = q && (q as any)[key] && (q as any)[key].estimated_flight_time;
                                            const { hours, minutes } = parseToHoursMinutes(ft);
                                            return (
                                                <Typography color="text.secondary">
                                                    {`${hours}h ${minutes}m`}
                                                </Typography>
                                            );
                                        })()}
                                        <Typography color="text.secondary" fontSize={12}>
                                            {/* Return: {q.returnTime} */}
                                        </Typography>
                                        {isDisabled &&
                                            <Box className="submit-rejection-reason">
                                                <Button sx={{ width: '220px' }} onClick={() => setRejectionModal(true)} className="btn btn-danger">Submit Rejection Reason</Button>
                                            </Box>
                                        }
                                    </> :
                                    label == 'Key Amenities' ?
                                        <>
                                            <Typography color="text.secondary">
                                                {(() => {
                                                    const amenities = q[key].map((amenity) => amenity.name);
                                                    return amenities.join(", ");
                                                })()}
                                            </Typography>
                                        </> :
                                        label == 'Included Service' ?
                                            <>
                                                <Typography color="text.secondary">
                                                    {q[key]}
                                                </Typography>
                                            </> :
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    whiteSpace: "pre-line",
                                                    color: isRich ? "text.secondary" : "text.primary",
                                                    fontWeight: isRich ? 400 : 500,
                                                }}
                                            >
                                                {applyCurrencyFormat(q[key])}
                                            </Typography>
                        }
                    </TableCell>
                )
            })}
        </TableRow>
    );

    return (
        <>
            <Box>
                {user.access_type === 'Portal Admin' &&
                    <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", flexWrap: 'wrap', gap: '4px' }}>
                        <Box>
                            <Typography variant="h4">
                                Quote Comparison
                            </Typography>
                            <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                {quotes?.length || 0} quotes received for this inquiry
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: "green", fontWeight: 600 }}>
                            Best Quote Price: {applyCurrencyFormat(bestQuotes?.total)}
                        </Typography>
                    </Box>
                }
                <Divider sx={{ my: 2 }} />
                {/* Table */}
                <Box sx={{ overflowX: "auto" }} className="quote-comparison-table">
                    <Table sx={{ borderCollapse: 'separate', '& .MuiTableCell-root': { border: '1px solid #eeeeee', textAlign: 'center' } }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { borderColor: '#eee' } }}>
                                <TableCell sx={{ position: { md: 'sticky', xs: 'static' }, left: 0, backgroundColor: '#fafafa', zIndex: 1 }}>
                                    <Typography variant="h4">
                                        Specifications
                                    </Typography>
                                </TableCell>
                                {quotes.length > 0 && quotes.map((quote) => {
                                    const isDisabled = acceptedQuoteId !== null && acceptedQuoteId !== quote.id;
                                    let image = quote.aircraft.images;
                                    image = JSON.parse(image);
                                    return (
                                        <TableCell key={quote.id} data-disabled={isDisabled}>
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                                                <img src={fileStorageUrl + image[0]} alt={quote.aircraft.asset_name} style={{ width: 'auto', maxWidth: '300px', height: '250px' }} />
                                                <Typography variant="h4">
                                                    {quote.client.name}
                                                </Typography>
                                                <Button className="btn btn-blue w-100" onClick={() => openQuoteDetails(quote)} disabled={isDisabled}>
                                                    View Details
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {renderRow("Rating", "rating")}
                            {renderRow("Aircraft", "aircraft")}
                            {renderRow("Price", "total")}
                            {renderRow("Flight Time", "estimated_flight_time")}
                            {renderRow("Base Fare", "base_fare")}
                            {renderRow("Fuel", "fluel_cost")}
                            {renderRow("Taxes & Fees", "taxes_fees")}
                            {renderRow("Catering", "catering_fees")}
                            {renderRow("Key Amenities", "available_amenities", true)}
                            {renderRow("Included Service", "special_offers_promotions", true)}


                            {user.access_type === 'Portal Admin' &&
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: "#fafafa", borderRight: "1px solid #eee", position: { md: 'sticky', xs: 'static' }, left: 0, zIndex: 1 }}>
                                        <Typography variant="h5">Select</Typography>
                                    </TableCell>
                                    {quotes.map((q) => {
                                        const isAccepted = acceptedQuoteId === q.id;
                                        const isDisabled = acceptedQuoteId !== null && acceptedQuoteId !== q.id;
                                        return (
                                            <TableCell key={q.id} data-disabled={isDisabled}>
                                                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                                    <Button className="btn btn-blue w-100" disabled={isDisabled} onClick={() => acceptQuote(q.id)}>
                                                        {isAccepted ? "Quote Accepted" : "Accept Quote"}
                                                    </Button>
                                                    {!isAccepted && (
                                                        <Button className="btn btn-danger w-100" onClick={() => rejectQuote(q.id)} disabled={isDisabled}>
                                                            Reject Quote
                                                        </Button>
                                                    )}
                                                </Box>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Box>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
                    <Button variant="outlined" className="btn btn-outlined" onClick={() => setShowDetailsTabs(false)}>
                        Close
                    </Button>
                    {user.access_type === 'Portal Admin' &&
                        <Button className="btn btn-blue" onClick={() => quoteSendToTravelAgent()}>
                            Send To Travel Agent
                        </Button>
                    }
                </Box>
            </Box>

            <CustomModal headerText={<Box>Quote Details <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
                {viewedQuote.clientName}
            </Typography></Box>} open={viewQuoteDetails} setOpen={setViewQuoteDetails} dataClose={() => setViewQuoteDetails(false)} className="modal-lg">

                <Grid container spacing={{ md: 2, xs: 1 }}>
                    {/* Flight Details */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
                                    Flight Details
                                </Typography>

                                <Grid container spacing={{ md: 2, xs: 1 }}>
                                    <Grid size={{ xs: 6 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                                            <FlightTakeoffIcon />
                                            <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>Departure:</Typography>
                                            <Typography variant="h5">{viewedQuote.departure}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
                                                Duration: {viewedQuote.flightTime}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 6 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                                            <FlightLandIcon />
                                            <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>Return:</Typography>
                                            <Typography variant="h5">{viewedQuote.return}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
                                                Duration: {viewedQuote.returnTime}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Aircraft Specifications */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
                                    Aircraft Specifications
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: '5px' }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                            Model:
                                        </Typography>
                                        <Typography variant="h6">{viewedQuote.model}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                            Year:
                                        </Typography>
                                        <Typography variant="h6">{viewedQuote.validityInYear}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                            Capacity:
                                        </Typography>
                                        <Typography variant="h6">{viewedQuote.capacity}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                            Range:
                                        </Typography>
                                        <Typography variant="h6">{viewedQuote.range}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                        <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                            Speed:
                                        </Typography>
                                        <Typography variant="h6">{viewedQuote.speed}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Price Breakdown */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
                                    Price Breakdown
                                </Typography>

                                {[
                                    ["Base Fare:", viewedQuote.baseFire],
                                    ["Fuel Surcharge:", viewedQuote.fluelCost],
                                    ["Taxes:", viewedQuote.taxesFees],
                                    ["Handling Fees:", viewedQuote.handlingFees],
                                    ["Catering:", viewedQuote.cateringFees],
                                    ["Crew Fees:", viewedQuote.crewFees],
                                ].map(([label, value]) => (
                                    <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: '5px', }}>
                                        <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                            {label}
                                        </Typography>
                                        <Typography variant="h6">{value}</Typography>
                                    </Box>
                                ))}

                                <Divider sx={{ my: 1 }} />

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="h6">Total</Typography>
                                    <Typography variant="h6"> {viewedQuote.total} </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Amenities & Services */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
                                    Amenities & Services
                                </Typography>

                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Aircraft Amenities
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                    {(viewedQuote?.aircraftAmenities ?? []).map((amenitie) => (
                                        <Typography key={amenitie.name} component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>{amenitie.name}</Typography>
                                    ))}
                                </Box>

                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Included Services
                                </Typography>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {/* {viewedQuote.includedServices.map((services) => ( */}
                                    <Typography key={viewedQuote.includedServices} component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>{viewedQuote.includedServices}</Typography>
                                    {/* ))} */}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Additional sections can be added here if needed */}
                    {/* <Grid size={{ xs: 12 }}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}> Additional Options </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5, backgroundColor: '#F1F3FF', p: 2, borderRadius: 1 }}>
                                        <Typography> Michelin-star chef catering </Typography>
                                        <Typography variant="h5">  3,50,000 </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5, backgroundColor: '#F1F3FF', p: 2, borderRadius: 1 }}>
                                        <Typography> Michelin-star chef catering </Typography>
                                        <Typography variant="h5">  3,50,000 </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid> */}
                    {/* Terms & Conditions  */}
                    <Grid size={{ xs: 12 }}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>Terms & Conditions</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography> {viewedQuote.cancelationCondition}  </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Additional Notes  */}
                    <Grid size={{ xs: 12 }}>
                        <Card elevation={2} sx={{ backgroundColor: '#F1F3FF' }}>
                            <CardContent>
                                <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>Additional Notes </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography> {viewedQuote.additionalNotes} </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {user.access_type === 'Portal Admin' &&

                    <Box className="modal-footer" sx={{ py: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2, '& .btn': { maxWidth: { sm: '200px', xs: 'calc(50% - 4px)' }, width: '100%' } }}>
                        <Button className="btn btn-blue" onClick={() => acceptRejectQuote(viewedQuote?.id, 'accept')}>Accept Quote</Button>
                        <Button className="btn btn-danger" onClick={() => acceptRejectQuote(viewedQuote?.id, 'reject')}>Reject Quote</Button>
                    </Box>
                }
            </CustomModal>

            {/* Rejection Reason Modal */}
            <CustomModal headerText='Rejection Reason' open={rejectionModal} setOpen={setRejectionModal} dataClose={() => setRejectionModal(false)}>
                <Typography component="form" onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333' }} required={true}>Massage</InputLabel>
                    <FormControl fullWidth>
                        <TextField
                            size="small"
                            multiline
                            minRows={4}
                            {...register("message", {
                                required: "Message is required",
                                minLength: {
                                    value: 5,
                                    message: "Message must be at least 5 characters",
                                },
                            })}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                        />
                    </FormControl>
                    <Box className="modal-footer" sx={{ pb: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2, '& .btn': { maxWidth: '150px', width: '100%' } }}>
                        <Button className="btn btn-outlined" onClick={handleClose}>Cancel</Button>
                        <Button className="btn btn-blue" type="submit">Send</Button>
                    </Box>
                </Typography>
            </CustomModal>

            {/* Send to travel agent modal */}
            <CustomModal headerText='Sent To Travel Agent' open={travelAgentModal} setOpen={setTravelAgentModal} dataClose={() => setTravelAgentModal(false)}>
                <Typography component="form" onSubmit={travelAgentHandleSubmit(travelAgentSubmit)}>
                    <CustomTextField
                        inputLabel={<>Commission Percentage <Typography component='span' sx={{ color: theme?.common?.redColor }}>*</Typography></>}
                        placeholder="Add your Commission Percentage"
                        size="large"
                        type="number"
                        error={!!travelAgentErrors.commissionPercentage}
                        helperText={travelAgentErrors.commissionPercentage?.message}
                        {...travelAgentRegister("commissionPercentage", {
                            required: "Commission percentage is required",
                            pattern: {
                                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                message: "Enter a valid number (e.g. 5 or 10.5)",
                            },
                            validate: (value) =>
                                Number(value) >= 0 && Number(value) <= 100
                                    ? true
                                    : "Percentage must be between 0 and 100",
                        })}
                    />
                    <Card elevation={2} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
                                Price Breakdown
                            </Typography>

                            {[
                                ["Base Fare:", viewedQuote.baseFire],
                                ["Fuel Surcharge:", viewedQuote.fluel],
                                ["Taxes:", viewedQuote.taxes],
                                ["Fees:", viewedQuote.fees],
                                ["Catering:", viewedQuote.catering],
                                ["Additional Services:", viewedQuote.AdditionalServices],
                            ].map(([label, value]) => (
                                <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: '5px', }}>
                                    <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                        {label}
                                    </Typography>
                                    <Typography variant="h6">{value}</Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6"> 1,00,45,000 </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Divider sx={{ my: 2 }} />
                    <Box className="modal-footer" sx={{ pb: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button className="btn btn-outlined" onClick={handleCancel}>Cancel</Button>
                        <Button className="btn btn-blue" type="submit">Send</Button>
                    </Box>
                </Typography>

            </CustomModal>
        </>
    )
}

export default ViewQuotes;