import React from "react";
import { Box, Typography, Divider, Grid, Card, CardContent, useTheme } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { applyCurrencyFormat, parseToHoursMinutes } from "@/utils/commonFunctions";
const QuoteDetails = ({ quote }) => {
    const theme = useTheme();
    const { hours, minutes } = parseToHoursMinutes(quote.estimated_flight_time);
    const viewedQuote = {
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
        quoteStatus: quote.is_selected || '',
    };
    return (
        <>
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
                                    <Typography variant="h5">{viewedQuote?.departure}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
                                        Duration: {viewedQuote?.flightTime}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 6 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                                    <FlightLandIcon />
                                    <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>Return:</Typography>
                                    <Typography variant="h5">{viewedQuote?.return}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'poppins-lt' }}>
                                        Duration: {viewedQuote?.returnTime}
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
                                <Typography variant="h6">{viewedQuote?.model}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                    Year:
                                </Typography>
                                <Typography variant="h6">{viewedQuote?.validityInYear}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                    Capacity:
                                </Typography>
                                <Typography variant="h6">{viewedQuote?.capacity}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                    Range:
                                </Typography>
                                <Typography variant="h6">{viewedQuote?.range}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                                <Typography color="#333333" variant="body2" sx={{ fontFamily: 'poppins-lt' }}>
                                    Speed:
                                </Typography>
                                <Typography variant="h6">{viewedQuote?.speed}</Typography>
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
                            ["Base Fare:", viewedQuote?.baseFire],
                            ["Fuel Surcharge:", viewedQuote?.fluelCost],
                            ["Taxes:", viewedQuote?.taxesFees],
                            ["Handling Fees:", viewedQuote?.handlingFees],
                            ["Catering:", viewedQuote?.cateringFees],
                            ["Crew Fees:", viewedQuote?.crewFees],
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
                            <Typography variant="h6"> {viewedQuote?.total} </Typography>
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
                                <Typography key={amenitie?.name} component="span" className="custom-pill" sx={{ backgroundColor: '#DCFCE7' }}>{amenitie?.name}</Typography>
                            ))}
                        </Box>

                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Included Services
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {/* {viewedQuote?.includedServices.map((services) => ( */}
                            <Typography key={viewedQuote?.includedServices} component="span" className="custom-pill" sx={{ backgroundColor: '#FEF3C7' }}>{viewedQuote?.includedServices}</Typography>
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
                            <Typography> {viewedQuote?.cancelationCondition}  </Typography>
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
                            <Typography> {viewedQuote?.additionalNotes} </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default QuoteDetails;