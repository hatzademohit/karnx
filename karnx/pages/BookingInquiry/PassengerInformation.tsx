'use client'
import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useState } from "react";
import { CustomTextField } from "@/components";
import { useStep } from '@/app/context/StepProvider';

const PassengerInformation = () => {

    const { formData, setFormData, medicalSupOptions } = useStep();

    const [passengers, setPassengers] = useState({
        Adults: formData?.passengerInfo.passanger_info_adults || 1,
        Children: formData?.passengerInfo.passanger_info_children || 0,
        Infants: formData?.passengerInfo.passanger_info_infants || 0,
    });

    const [specialAssistance, setSpecialAssistance] = useState(medicalSupOptions);

    // Pet-related state
    const [isTravellingWithPets, setIsTravellingWithPets] = useState(false);
    const [petType, setPetType] = useState("");
    const [petSize, setPetSize] = useState("");
    const [petAdditionalNotes, setPetAdditionalNotes] = useState("");

    // Medical Assistance state
    const [isMedicalAssistanceReq, setIsMedicalAssistanceReq] = useState(false);
    const [selectedAssistance, setSelectedAssistance] = useState<number[]>([]);

    //Bags state
    const [checkedBags, setCheckedBags] = useState<any>(0);
    const [carryOnBags, setCarryOnBags] = useState<any>(0);
    const [oversizedItems, setOversizedItems] = useState("");
    // Sync passengers, pets, and medical assistance into formData
    useEffect(() => {
        setFormData((prev: any) => ({
            ...prev,
            passengerInfo: {
                ...prev.passengerInfo,
                passanger_info_adults: passengers.Adults,
                passanger_info_children: passengers.Children,
                passanger_info_infants: passengers.Infants,
                passenger_info_total: passengers.Adults + passengers.Children + passengers.Infants,
                is_traveling_pets: isTravellingWithPets,
                pet_travels: isTravellingWithPets ? {
                    pet_type: petType,
                    pet_size: petSize,
                    additional_notes: petAdditionalNotes
                } : {
                    pet_type: '',
                    pet_size: '',
                    additional_notes: ''
                },
                is_medical_assistance_req: isMedicalAssistanceReq,
                medical_assistance: isMedicalAssistanceReq
                  ? { medical_assist_id: Object.fromEntries(selectedAssistance.map((id, idx) => [idx, id])) }
                  : { medical_assist_id: {} }
            }
        }));
    }, [passengers, isTravellingWithPets, petType, petSize, petAdditionalNotes, isMedicalAssistanceReq, selectedAssistance, setFormData]);

    // Clear the pet fields in local state if "no" is selected
    useEffect(() => {
        if (!isTravellingWithPets) {
            setPetType('');
            setPetSize('');
            setPetAdditionalNotes('');
        }
    }, [isTravellingWithPets]);

    // Clear medical assistance if "no" is selected
    useEffect(() => {
      if (!isMedicalAssistanceReq) {
        setSelectedAssistance([]);
      }
    }, [isMedicalAssistanceReq]);

    // Clear the pet fields in local state if "no" is selected
    useEffect(() => {
        if (!isTravellingWithPets) {
            setPetType('');
            setPetSize('');
            setPetAdditionalNotes('');
        }
    }, [isTravellingWithPets]);
    // Sync bags info into formData
    useEffect(() => {
        setFormData((prev: any) => ({
            ...prev,
            passengerInfo: {
                ...prev.passengerInfo,
                checked_bag: checkedBags,
                carry_bag: carryOnBags,
                oversized_items: oversizedItems
            }
        }));
      }, [checkedBags, carryOnBags, oversizedItems]);

    const handleChange = (type: keyof typeof passengers, action: "inc" | "dec") => {
        setPassengers((prev) => ({
            ...prev,
            [type]:
                action === "inc"
                    ? prev[type] + 1
                    : type === "Adults"
                        ? Math.max(1, prev[type] - 1)
                        : Math.max(0, prev[type] - 1),
        }));
    };

    const handleSpecialAssistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSpecialAssistance((prev) => [...prev, value]);
        } else {
            setSpecialAssistance((prev) => prev.filter((item) => item !== value));
        }
    };
    
    const setAtIndex = (arr: any[], index: number, value: any) => {
        const copy = [...arr];
        copy[index] = value;
        return copy;
    };

    console.log(formData, 'formData');
    return(
        <>
            <Grid item lg={12}>
                <Typography variant="h3" sx={{color: '#BC0019'}}>Passenger Information</Typography>
            </Grid>
            {Object.keys(passengers).map((type) => (
                <Grid item lg={3} md={6} sm={6} xs={12} key={type}>
                    <Typography sx={{fontFamily: 'poppins-lt', fontSize: '14px', mb: '8px'}}>
                        {type === 'Children' ? 'Children (2-12 yrs)' : type === 'Infants' ? 'Infants (under 2)' : type}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <IconButton
                            className="btn-icon-border"
                            onClick={() => handleChange(type as keyof typeof passengers, "dec")}
                        >
                            <RemoveRoundedIcon />
                        </IconButton>
                        <Typography component="h5" variant="h5">
                            {passengers[type as keyof typeof passengers]}
                        </Typography>
                        <IconButton
                            className="btn-icon-border"
                            onClick={() => handleChange(type as keyof typeof passengers, "inc")}
                        >
                            <AddRoundedIcon />
                        </IconButton>
                    </Box>
                </Grid>
            ))}
            <Grid item lg={3} md={6} sm={6} xs={12}> 
                <CustomTextField 
                    inputLabel="Total Passengers"
                    value={passengers.Adults + passengers.Children + passengers.Infants}
                    disabled={true}
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className='passengers-travelling-info-box'>
                    <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Travelling With Pets</Typography>
                    <FormControl>
                        <RadioGroup row
                            name="travelling-with-pets"
                            value={isTravellingWithPets ? "yes" : "no"}
                            onChange={e => setIsTravellingWithPets(e.target.value === "yes")}
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    {isTravellingWithPets && (
                        <Grid container spacing={2}>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    inputLabel="Pet Type"
                                    className='white-bg-input'
                                    value={petType}
                                    onChange={e => setPetType(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    inputLabel="Pet Size"
                                    placeholder="Enter Pet Weight"
                                    className='white-bg-input'
                                    value={petSize}
                                    onChange={e => setPetSize(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                                <CustomTextField
                                    inputLabel="Special Requirements..."
                                    className='white-bg-input'
                                    value={petAdditionalNotes}
                                    onChange={e => setPetAdditionalNotes(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box className='passengers-travelling-info-box'>
                    <Typography sx={{ fontFamily: 'poppins-md', fontSize: '14px' }}>Medical needs or assistance required</Typography>
                    <FormControl>
                        <RadioGroup row
                            name="medical-needs"
                            value={isMedicalAssistanceReq ? "yes" : "no"}
                            onChange={e => setIsMedicalAssistanceReq(e.target.value === "yes")}
                        >
                            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    {isMedicalAssistanceReq && (
                      <Grid container spacing={1}>
                          <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Typography component='h4' variant="h4" sx={{mt: '10px'}}>Special Assistance</Typography>
                              <Typography sx={{ fontFamily: 'poppins-lt', fontSize: '14px', color: '#959595', my: '10px' }}>
                                  Select Any Assistance needed for passenger
                              </Typography>
                          </Grid>
                          {specialAssistance && specialAssistance.map((assistance) => (
                              <Grid item lg={4} md={4} sm={6} xs={6} key={assistance.id}>
                                  <FormControlLabel
                                      label={assistance.name}
                                      control={
                                          <Checkbox
                                              size="small"
                                              checked={selectedAssistance.includes(assistance.id)}
                                              onChange={e => {
                                                  if (e.target.checked) {
                                                      setSelectedAssistance(prev => [...prev, assistance.id]);
                                                  } else {
                                                      setSelectedAssistance(prev => prev.filter(id => id !== assistance.id));
                                                  }
                                              }}
                                          />
                                      }
                                  />
                                  {assistance.id === 6 &&
                                      /* If 'Other' is selected, show a text field for additional notes */
                                      <CustomTextField placeholder="Enter" className='white-bg-input' />
                                  }
                              </Grid>
                          ))}
                      </Grid>
                    )}
                </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomTextField inputLabel="Checked Bags" value={checkedBags} onChange={e => setCheckedBags(e.target.value) } />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomTextField inputLabel="Carry -on Bags" value={carryOnBags} onChange={e => setCarryOnBags(e.target.value)} />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <CustomTextField inputLabel="Oversized Items" value={oversizedItems} onChange={e => setOversizedItems(e.target.value)} placeholder="e.g., golf clubs, skis, etc." />
            </Grid>
        </>
    )
}

export default PassengerInformation;
