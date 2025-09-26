"use client";
import { apiBaseUrl } from "@/karnx/api";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/karnx/Hooks/useApi";
import { toast } from "react-toastify";

type StepContextType = {
  airportCity: any[];
  medicalSupOptions: any[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  radioTabActive: number;
  setRadioTabActive: React.Dispatch<React.SetStateAction<number>>;
  aircraftTypeOptions?: any[];
  crewRequirementOptions?: any[];
  travelingPurposeOption?: any[];
  cateringDietaryOptions?: any[];
  storeBookingInquiryData?: (data: any) => Promise<any>;
  handleBackClick?: any;
  handleNextClick?: any; 
  handleFinish?: any; 
  activeStep?: number;
  setActiveStep?: any
};

// ---- CONTEXT ----
const StepContext = createContext<StepContextType | undefined>(undefined);

// ---- PROVIDER ----
export const StepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [radioTabActive, setRadioTabActive] = useState<number>(0);
  const [activeStep, setActiveStep] = React.useState(0);

  const router = useRouter();

  const [formData, setFormData] = useState<any>({});

  const { data: airportCity, refetch: fetchAirportCities } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/airport-cities`
  );

  const { data: medicalSupOptions, refetch: fetchMedicalAssistanceOptions } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/medical-supports`
  );

  const { data: aircraftTypeOptions, refetch: fetchAirCraftTypes } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/aircraft-types`
  );

  const { data: crewRequirementOptions, refetch: fetchCrewRequirements } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/crew-requirements`
  );

  const { data: travelingPurposeOption, refetch: fetchTravelingPurpose } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/travel-purposes`
  );
    
  const { data: cateringDietaryOptions, refetch: fetchCateringDietaryOptions } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/catering-dietary`
  );

  const { data: storeData, refetch: storeBookingInquiry, error } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/catering-dietary`, {
    method: "POST",
    skip: true,
    body: formData,
  });

  const storeBookingInquiryData = async () => {
    await storeBookingInquiry(); // Will trigger POST call

    if (error) {
      toast.error(error || "Failed to submit booking inquiry.");
    } else if (storeData) {
      toast.success("Booking inquiry submitted successfully!");
      router.push("/inquiries");
    }
  };

  useEffect(() => {
    fetchAirportCities();
    fetchMedicalAssistanceOptions();
    fetchAirCraftTypes();
    fetchCrewRequirements(); 
    fetchTravelingPurpose();
    fetchCateringDietaryOptions();
  }, []);

  const handleNextClick = () => setActiveStep((prev) => prev + 1);
  const handleBackClick = () => setActiveStep((prev) => prev - 1);

    const handleFinish = async () => {
      await storeBookingInquiryData();
    };

  return (
    <StepContext.Provider value={{ airportCity, formData, setFormData, radioTabActive, setRadioTabActive, medicalSupOptions, aircraftTypeOptions, crewRequirementOptions, travelingPurposeOption, cateringDietaryOptions, handleFinish, handleBackClick, handleNextClick, activeStep, setActiveStep }}>
      {children}
    </StepContext.Provider>
  );
};

// ---- HOOK ----
export const useStep = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};