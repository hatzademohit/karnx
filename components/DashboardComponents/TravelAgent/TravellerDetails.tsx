import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box, Button, Typography, Checkbox, FormControlLabel, Grid, Alert, CardContent, Card, useTheme, Divider } from "@mui/material";
import { CustomTextField } from "@/components/CustomTextField/CustomTextField";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

const TravellerDetails = () => {

    const theme = useTheme();
    const { setValue, watch } = useFormContext();
    const { adultsChild } = useInquiryDetails();
    const formData = {
        adults: watch("adults"),
        children: watch("children"),
        infants: watch("infants"),
    };
    //console.log(formData, 'mukesh dd');
    type Person = { name: string; age: string; selected: boolean };
    const [inputs, setInputs] = useState({
        adults: { name: "", age: "" },
        children: { name: "", age: "" },
        infants: { name: "", age: "" },
    });
    const [lists, setLists] = useState({
        adults: [] as Person[],
        children: [] as Person[],
        infants: [] as Person[],
    });
    // Generic Add Function
    const handleAdd = (type: "adults" | "children" | "infants") => {
        const input = inputs[type];
        if (!input.name || !input.age) return;
        const updated = [...lists[type], { ...input, selected: true }];
        setLists({ ...lists, [type]: updated });
        setValue(type, updated.filter((i) => i.selected));
        setInputs({ ...inputs, [type]: { name: "", age: "" } });
    };
    // Generic Toggle Function
    const handleToggle = (type: "adults" | "children" | "infants", index: number) => {
        const updated = lists[type].map((item, i) =>
            i === index ? { ...item, selected: !item.selected } : item
        );
        setLists({ ...lists, [type]: updated });
        setValue(type, updated.filter((i) => i.selected));
    };
    // Generic handal errors 
    const validateAge = (type: "adults" | "children" | "infants", age: string) => {
        if (!age) return "";
        const value = Number(age);
        const ranges = {
            adults: { min: 12, max: 100 },
            children: { min: 2, max: 11 },
            infants: { min: 0, max: 2 },
        };
        const { min, max } = ranges[type];
        if (value < min || value > max) {
            return `Age must be between ${min} and ${max}`;
        }
        return "";
    };
    const adultAgeError = validateAge("adults", inputs.adults.age);
    const childAgeError = validateAge("children", inputs.children.age);
    const infantAgeError = validateAge("infants", inputs.infants.age);

    useEffect(() => {
        setLists({
            adults: formData?.adults.map((item) => ({ name: item?.name ?? "", age: item?.age, selected: true })),
            children: formData?.children.map((item) => ({ name: item?.name ?? "", age: item?.age, selected: true })),
            infants: formData?.infants.map((item) => ({ name: item?.name ?? "", age: item?.age, selected: true })),
        })
    }, [adultsChild]);
    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Box>
                    <Typography variant="h4">
                        Traveller Details
                    </Typography>
                    <Typography color="#333333" variant="body2">
                        Choose from the saved list or add a new passenger
                    </Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Alert severity="warning" sx={{ borderLeft: '5px solid #ed6c02' }}>Please ensure that your name matches your govt. ID such as Aadhaar, Passport or Driver's License.</Alert>
            </Grid>
            {/* Show added adults */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h5" color={theme.common?.redColor} sx={{ mb: 1 }}>
                            Adults (12 yrs or above)
                        </Typography>
                        <Box mt={1}>
                            {lists?.adults?.map((item: any, index: number) => (
                                <FormControlLabel key={index}
                                    control={<Checkbox size="small" checked={item.selected} onChange={() => handleToggle("adults", index)} />}
                                    label={`${item.name}, age ${item.age}`}
                                />
                            ))}
                        </Box>
                        <Grid container spacing={1} className="adult-section">
                            <Grid size={{ xs: 12, lg: 5 }}>
                                <CustomTextField
                                    inputLabel="Name"
                                    size="small"
                                    value={inputs?.adults?.name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[A-Za-z\s]*$/.test(value)) {
                                            setInputs({ ...inputs, adults: { ...inputs.adults, name: value } })
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 5 }}>
                                <CustomTextField
                                    inputLabel="Age"
                                    size="small"
                                    type="number"
                                    value={inputs?.adults.age}
                                    onChange={(e) => setInputs({ ...inputs, adults: { ...inputs.adults, age: e.target.value } })}
                                    error={Boolean(adultAgeError)}
                                    helperText={adultAgeError}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 2 }}>
                                <Button
                                    className="btn btn-blue w-100"
                                    sx={{ height: '35px', mt: { lg: '22px', xs: '10px' } }}
                                    disabled={!inputs?.adults.name || !inputs?.adults.age}
                                    onClick={() => handleAdd("adults")}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {/* Show added child */}
            <Grid size={{ xs: 12, md: 6 }} className="child-section">
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h5" color={theme.common?.redColor} sx={{ mb: 1 }}>
                            Child (2-12 yrs)
                        </Typography>
                        <Box mt={1}>
                            {lists?.children?.map((item: any, index: number) => (
                                <FormControlLabel key={index}
                                    control={
                                        <Checkbox size="small" checked={item.selected == 1 ? true : item.selected} onChange={() => handleToggle("children", index)} />
                                    }
                                    label={`${item.name}, age ${item.age}`}
                                />
                            ))}
                        </Box>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12, lg: 5 }}>
                                <CustomTextField
                                    inputLabel="Name"
                                    size="small"
                                    value={inputs?.children?.name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[A-Za-z\s]*$/.test(value)) {
                                            setInputs({ ...inputs, children: { ...inputs.children, name: value } })
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 5 }}>
                                <CustomTextField
                                    inputLabel="Age"
                                    size="small"
                                    type="number"
                                    value={inputs?.children?.age}
                                    onChange={(e) => setInputs({ ...inputs, children: { ...inputs.children, age: e.target.value } })}
                                    error={Boolean(childAgeError)}
                                    helperText={childAgeError}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 2 }}>
                                <Button
                                    className="btn btn-blue w-100"
                                    sx={{ height: '35px', mt: { lg: '22px', xs: '10px' } }}
                                    disabled={!inputs?.children?.name || !inputs?.children?.age}
                                    onClick={() => handleAdd("children")}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {/* Show added infants */}
            <Grid size={{ xs: 12, md: 6 }} className="infants-section">
                <Card elevation={2}>
                    <CardContent>
                        <Typography variant="h5" color={theme.common?.redColor} sx={{ mb: 1 }}>
                            Infant (0-2 yrs)
                        </Typography>
                        <Box mt={1}>
                            {lists?.infants?.map((item: any, index: number) => (
                                <FormControlLabel key={index}
                                    control={
                                        <Checkbox size="small" checked={item.selected == 1 ? true : item.selected} onChange={() => handleToggle("infants", index)} />
                                    }
                                    label={`${item.name}, age ${item.age}`}
                                />
                            ))}
                        </Box>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12, lg: 5 }}>
                                <CustomTextField
                                    inputLabel="Name"
                                    size="small"
                                    value={inputs?.infants?.name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[A-Za-z\s]*$/.test(value)) {
                                            setInputs({ ...inputs, infants: { ...inputs.infants, name: value } })
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 5 }}>
                                <CustomTextField
                                    inputLabel="Age"
                                    size="small"
                                    type="number"
                                    value={inputs?.infants?.age}
                                    onChange={(e) => setInputs({ ...inputs, infants: { ...inputs.infants, age: e.target.value } })}
                                    error={Boolean(infantAgeError)}
                                    helperText={infantAgeError}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 2 }}>
                                <Button
                                    className="btn btn-blue w-100"
                                    sx={{ height: '35px', mt: { lg: '22px', xs: '10px' } }}
                                    disabled={!inputs?.infants.name || !inputs?.infants.age}
                                    onClick={() => handleAdd('infants')}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Divider className="cust-divider" />
            </Grid>
        </>
    );
};

export default TravellerDetails;
