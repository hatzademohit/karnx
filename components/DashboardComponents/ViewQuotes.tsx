import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableRow, TableCell, Divider, TableHead, Grid, Card, CardContent, useTheme, InputLabel, FormControl, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { CustomModal, CustomTextField, QuoteDetails } from "@/components";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { useForm } from "react-hook-form";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import { apiBaseUrl, fileStorageUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import useApiFunction from "@/karnx/Hooks/useApiFunction";
import dayjs from "dayjs";
import { useAuth } from "@/app/context/AuthContext";
import { applyCurrencyFormat, parseToHoursMinutes } from "@/utils/commonFunctions";

interface RejectionFormData {
    message: string;
}

const ViewQuotes = () => {
    const callApi = useApiFunction();
    const { inquiryId, setShowDetailsTabs, inquiryRowData } = useInquiryDetails();
    const [quotes, setQuotes] = useState([]);
    const [nonRejectedQuotes, setNonRejectedQuotes] = useState([]);
    const [openBoxQuote, setOpenBoxQuote] = useState([]);
    const [bestQuotes, setBestQuotes] = useState<any>(null);
    const [acceptedQuoteId, setAcceptedQuoteId] = useState<Number>(null);
    const [acceptedQuote, setAcceptedQuote] = useState<any>([]);
    const [viewQuoteDetails, setViewQuoteDetails] = useState<boolean>(false);
    const [rejectionModal, setRejectionModal] = useState<boolean>(false);
    const [travelAgentModal, setTravelAgentModal] = useState<boolean>(false);
    const [viewedQuote, setViewedQuote] = useState<any>([]);
    const theme = useTheme();
    const { user } = useAuth();
    const [quoteIdForRejection, setQuoteIdForRejection] = useState<number | null>(null);
    const [sameReason, setSameReason] = useState(false);
    const [sharedReason, setSharedReason] = useState("");


    const openQuoteDetails = (quote: any) => {
        const { hours, minutes } = parseToHoursMinutes(quote.estimated_flight_time);
        const quoteViewData = {
            clientName: quote.client.name + ' · ' + quote.aircraft.asset_name,

            /* id: quote.id,
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
             additionalNotes: quote.additional_notes || '', */
            quoteStatus: quote.is_selected || '',
            quote: quote
        };
        setOpenBoxQuote(quote);
        setViewedQuote(quoteViewData);
        setViewQuoteDetails(true);
    };

    const acceptQuote = (id, acceptedQuote = []) => {
        setAcceptedQuote(acceptedQuote);
        setAcceptedQuoteId(id);
        setViewQuoteDetails(false);
    }

    const cancelAcception = () => {
        setAcceptedQuoteId(null);
        setAcceptedQuote([]);
    }

    const rejectQuote = (id) => {
        setRejectionModal(true);
        setQuoteIdForRejection(id);
    }

    const quoteSendToTravelAgent = () => {
        // acceptedQuoteId
        setTravelAgentModal(true);
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RejectionFormData>({
        defaultValues: {
            message: "",
        },
    });

    const onRejectionSubmit = async (data: RejectionFormData) => {
        const quoteId = quoteIdForRejection;
        try {
            const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/reject-quote`, body: { quoteId, inquiryId, message: data.message } });
            if (res?.status === true) {
                toast.success(res?.message || '');
                setRejectionModal(false);
                reset();
                fetchQuotes();
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            //toast.error('Network error while accepting/rejecting quote');
        }
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
        setValue: travelAgentSetValue,
        watch: travelAgentWatch,
    } = useForm<any>({
        mode: 'onChange',
        defaultValues: {
            commissionPercentage: "",
            rejectionReason: ''
        },
    });

    useEffect(() => {
        let rejectQId = [];
        quotes.filter((q) => q.id !== acceptedQuoteId && q.is_selected !== 'rejected').map((quote, index) => {
            //if (quote.is_selected !== 'rejected') {
            // console.log(rejectQId.indexOf(quote.id));
            if (rejectQId.indexOf(quote.id) === -1) {
                rejectQId.push(quote.id);
                travelAgentSetValue(`rejectedQuote.${index}`, quote.id);
                travelAgentSetValue(`rejectionReason.${index}`, "");
            }
            // travelAgentSetValue(`rejectedQuote.${index}`, quote.id);
            // travelAgentSetValue(`rejectionReason.${index}`, "");
            //}
        });
    }, [acceptedQuoteId]);

    const travelAgentSubmit = async (data: any) => {
        try {
            const bodyParam = {
                inquiryId,
                acceptedQId: acceptedQuoteId,
                kxMgrCommissionPercent: data.commissionPercentage,
                message: data.rejectionReason,
                quoteIds: data.rejectedQuote,
            };
            const res = await callApi({ method: 'POST', url: `${apiBaseUrl}/inquiry-quotes/approve-quote`, body: bodyParam });
            if (res?.status === true) {
                toast.success(res?.message || '');
                setShowDetailsTabs(false);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            //toast.error('Network error while sending quote to travel agent');
        }
    };

    const handleCancel = () => {
        // console.log("Cancelled quote dd id:", viewedQuote?.id);
        setTravelAgentModal(false);
        travelAgentReset();
    };

    const fetchQuotes = async () => {
        try {
            const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/inquiry-quotes/get-quoted-quotes/${inquiryId}` });
            if (res?.status === true) {
                setQuotes(res.data.quotes);
                setNonRejectedQuotes(res.data.non_rejected_quotes);
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


    const renderRow = (label: string, key: keyof typeof quotes[0], isRich?: boolean) => (
        <TableRow>
            <TableCell sx={{ position: { md: 'sticky', xs: 'static' }, left: 0, backgroundColor: '#fafafa', zIndex: 1 }}>
                <Typography variant="h5" >{label}</Typography>
            </TableCell>
            {quotes.length > 0 && quotes.map((q) => {
                let isDisabled = acceptedQuoteId !== null && acceptedQuoteId !== q.id;
                isDisabled = (q.is_selected === 'rejected');
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
                                        {/* {isDisabled &&
                                            <Box className="submit-rejection-reason">
                                                <Button sx={{ width: '220px' }} onClick={() => setRejectionModal(true)} className="btn btn-danger">Submit Rejection Reason</Button>
                                            </Box>
                                        } */}
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
                                            label == 'Rejected Reason' && q.is_selected === 'rejected' && q[key] !== '' && q[key] !== null ?
                                                <>
                                                    <Typography sx={{ color: "red", fontWeight: 600 }}>
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

    const commissionCalculate = (key) => {
        const currency = Number(key ?? 0);
        const percentage = (currency * Number(travelAgentWatch("commissionPercentage"))) / 100;
        const totalCommission = Number(key ?? 0) + percentage;
        const displayValue = (Number(travelAgentWatch("commissionPercentage")) <= 0) ? applyCurrencyFormat(currency) : `${applyCurrencyFormat((currency.toFixed(2)))} + ${applyCurrencyFormat(percentage.toFixed(2))} = ${applyCurrencyFormat(totalCommission.toFixed(2))}`;

        return displayValue;
    }
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
                            {(user.access_type === 'Portal Admin') || (user.access_type === 'Aircraft Operator' && quotes[0]?.is_selected === 'rejected') ?
                                <>
                                    {renderRow("Rejected Reason", "rejected_reason", true)}
                                </>
                                :
                                <>

                                </>
                            }

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
                                                {q.is_selected === 'rejected' ?
                                                    <>
                                                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                                            <Button className="btn btn-defualt w-100" disabled={true}>
                                                                Quote Rejected
                                                            </Button>
                                                        </Box>

                                                    </>
                                                    :

                                                    <>
                                                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                                            {['selected', 'approved'].includes(q.is_selected) ?
                                                                <>
                                                                    <Button className="btn btn-green w-100" >
                                                                        Quote Accepted
                                                                    </Button>
                                                                </>
                                                                :
                                                                <>
                                                                    <Button className="btn btn-blue w-100" disabled={isDisabled} onClick={() => acceptQuote(q.id, q)}>
                                                                        {isAccepted ? "Quote Accepted" : "Accept Quote"}
                                                                    </Button>
                                                                </>
                                                            }
                                                            {isAccepted && (
                                                                <Button className="btn btn-danger w-100" disabled={isDisabled} onClick={() => cancelAcception()}>
                                                                    Cancel
                                                                </Button>
                                                            )}
                                                            {!isAccepted && !['selected', 'approved'].includes(q.is_selected) && (
                                                                <Button className="btn btn-danger w-100" onClick={() => rejectQuote(q.id)} disabled={isDisabled}>
                                                                    Reject Quote
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    </>
                                                }

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
                        <Button className="btn btn-blue" disabled={acceptedQuoteId == null || acceptedQuoteId == 0} onClick={() => quoteSendToTravelAgent()}>
                            Send To Travel Agent
                        </Button>
                    }
                </Box>
            </Box>

            {/* View quote modal */}
            <CustomModal headerText={<Box>Quote Details <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
                {viewedQuote.clientName}
            </Typography></Box>} open={viewQuoteDetails} setOpen={setViewQuoteDetails} dataClose={() => setViewQuoteDetails(false)} className="modal-lg">

                {/* view quotes component */}
                <Grid container spacing={{ md: 2, xs: 1 }}>
                    <QuoteDetails quote={viewedQuote.quote} />
                </Grid>
                {user.access_type === 'Portal Admin' &&

                    <Box className="modal-footer" sx={{ py: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2, '& .btn': { maxWidth: { sm: '200px', xs: 'calc(50% - 4px)' }, width: '100%' } }}>
                        {viewedQuote?.quoteStatus === 'rejected' ?
                            <>
                                <Button className="btn btn-defualt" disabled={true}>
                                    Quote Rejected
                                </Button>
                            </>
                            :
                            <>
                                {['selected', 'approved'].includes(viewedQuote.quoteStatus) ?
                                    <>
                                        <Button className="btn btn-green">Quote Accepted</Button>
                                    </>
                                    :
                                    <>
                                        <Button className="btn btn-blue" onClick={() => acceptQuote(viewedQuote?.id, openBoxQuote)}>Accept Quote</Button>
                                        <Button className="btn btn-danger" onClick={() => rejectQuote(viewedQuote?.id)}>Reject Quote</Button>
                                    </>
                                }
                            </>
                        }
                    </Box>
                }
            </CustomModal>

            {/* Rejection Reason Modal */}
            <CustomModal sx={{ '.MuiDialog-container .MuiPaper-root': { maxWidth: '400px' } }} headerText={<Box sx={{ fontSize: '18px' }}>Rejection Reason <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }} >
                Submit Quote Rejection Reason
            </Typography ></Box >
            } open={rejectionModal} setOpen={setRejectionModal} dataClose={() => setRejectionModal(false)}>
                < Typography component="form" onSubmit={handleSubmit(onRejectionSubmit)} >
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
                            placeholder="Write your reason for rejecting the quote..."
                            error={!!errors.message}
                            helperText={errors.message?.message}
                        />
                    </FormControl>
                    <Divider sx={{ mb: 2, mt: 4 }} />
                    <Box className="modal-footer" sx={{ pb: '10px', mt: '10px', display: 'flex', justifyContent: 'flex-end', gap: 2, '& .btn': { maxWidth: '150px', width: '100%' } }}>
                        <Button className="btn btn-outlined" onClick={handleClose}>Cancel</Button>
                        <Button className="btn btn-blue" type="submit" >Send</Button>
                    </Box>
                </Typography >
            </CustomModal >

            {/* Send to travel agent modal */}
            <CustomModal headerText={<Box sx={{ fontSize: '18px' }}>Sent To Travel Agent <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }} >
                Submit Your Commission
            </Typography ></Box >
            } open={travelAgentModal} setOpen={setTravelAgentModal} dataClose={() => setTravelAgentModal(false)}>
                <Typography component="form" onSubmit={travelAgentHandleSubmit(travelAgentSubmit)}>
                    <CustomTextField
                        inputLabel={<>Commission Percentage %<Typography component='span' sx={{ color: theme?.common?.redColor }}>*</Typography></>}
                        placeholder="Add your Commission Percentage"
                        size="large"
                        type="number"
                        error={!!travelAgentErrors.commissionPercentage}
                        helperText={travelAgentErrors.commissionPercentage?.message as string}
                        {...travelAgentRegister("commissionPercentage", {
                            required: "Commission percentage is required",
                            pattern: {
                                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                                message: "Enter a valid number (e.g. 5 or 10.5)",
                            },
                            validate: (value) =>
                                Number(value) >= 0 && Number(value) <= 99
                                    ? true
                                    : "Percentage must be between 0 and 99",
                        })}
                    />
                    {nonRejectedQuotes?.length > 0 &&
                        <Card elevation={2} sx={{ mt: 2 }}>
                            <CardContent>
                                <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                    <Typography variant="h4" color={theme.common?.blueColor}>
                                        Rejected Quotes
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={sameReason}
                                                onChange={(e) => {
                                                    setSameReason(e.target.checked);
                                                    if (e.target.checked) {
                                                        const firstValue = travelAgentWatch(`rejectionReason[0]`) || "";
                                                        setSharedReason(firstValue);
                                                        quotes.forEach((item, index) =>
                                                            travelAgentSetValue(`rejectionReason[${index}]`, firstValue)
                                                        );
                                                    }
                                                }}
                                            />
                                        }
                                        label="Same reason for others"
                                    />

                                </Box>
                                {quotes.filter((q) => q.id !== acceptedQuoteId).map((quote, index) => {

                                    // {quotes.map((quote, index) => {
                                    if (quote.id !== acceptedQuoteId && quote.is_selected !== 'rejected') {
                                        return (
                                            <React.Fragment key={quote.id}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, justifyContent: 'space-between', '.textflied-container': { maxWidth: '250px', width: '100%' } }}>
                                                    <Typography sx={{ lineHeight: '14px' }}>
                                                        {quote?.client?.name}
                                                        <Typography component='span' sx={{ fontSize: '12px', display: 'inline-block', width: '100%' }} color="text.secondary">
                                                            Quote Amount:  {quote?.total}
                                                        </Typography>
                                                    </Typography>
                                                    <CustomTextField
                                                        placeholder="Enter rejection reason"
                                                        size="small"
                                                        error={!!travelAgentErrors.rejectionReason}
                                                        helperText={travelAgentErrors.rejectionReason?.message as string}
                                                        value={sameReason ? sharedReason : travelAgentWatch(`rejectionReason[${index}]`) || ""}
                                                        onChange={(e) => {
                                                            if (sameReason) {
                                                                setSharedReason(e.target.value);
                                                                quotes.forEach((item, qindex) => travelAgentSetValue(`rejectionReason[${qindex}]`, e.target.value));
                                                            } else {
                                                                travelAgentSetValue(`rejectionReason[${index}]`, e.target.value);
                                                            }
                                                        }}
                                                        sx={{ maxWidth: '250px' }}
                                                    />

                                                </Box>
                                                {(quotes.length != 0) && (index != quotes.length - 1) && <Divider sx={{ my: 1 }} />}
                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </CardContent>
                        </Card>
                    }
                    <Card elevation={2} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h4" color={theme.common?.blueColor} sx={{ mb: 2 }}>
                                Price Breakdown
                            </Typography>

                            {[
                                ["Base Fare:", commissionCalculate(acceptedQuote.base_fare)],
                                ["Fuel Surcharge:", commissionCalculate(acceptedQuote.fluel_cost)],
                                ["Taxes:", commissionCalculate(acceptedQuote.taxes_fees)],
                                ["Handling Fees:", commissionCalculate(acceptedQuote.handling_fees)],
                                ["Catering:", commissionCalculate(acceptedQuote.catering_fees)],
                                ["Crew Fees:", commissionCalculate(acceptedQuote.crew_fees)],
                            ].map(([label, value]) => (
                                <Box key={label as any} sx={{ display: "flex", justifyContent: "space-between", mb: '5px', }}>
                                    <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                        {label}
                                    </Typography>
                                    <Typography variant="h6">{value}</Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 1 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6"> {commissionCalculate(acceptedQuote?.total)} </Typography>
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