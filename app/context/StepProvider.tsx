"use client";
import { apiBaseUrl } from "@/karnx/api";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/karnx/Hooks/useApi";
import { useResponceApi } from "@/karnx/Hooks/useResponceApi";
import { toast } from "react-toastify";

type StepContextType = {
  airportCity: any[];
  medicalSupOptions: any[];
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formatedFormData: any;
  setFormatedFormData: React.Dispatch<React.SetStateAction<any>>;
  radioTabActive: number;
  setRadioTabActive: React.Dispatch<React.SetStateAction<number>>;
  aircraftTypeOptions?: any[];
  crewRequirementOptions?: any[];
  travelingPurposeOption?: any[];
  cateringDietaryOptions?: any[];
  requiredDocumentUploadOptions?: any[];
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
  const [formatedFormData, setFormatedFormData] = useState<any>({});

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

  const { data: requiredDocumentUploadOptions, refetch: fetchRequiredDocumentUploadOptions } = useApi<any[]>(
    `${apiBaseUrl}/form-fields-data/required-document-option`
  );

  const { data: storeData, refetch: storeBookingInquiry, error } = useResponceApi<any[]>(
    `${apiBaseUrl}/booking-inquiries`, {
    method: "POST",
    skip: true,
    body: formatedFormData,
  });

  const storeBookingInquiryData = async () => {
    await storeBookingInquiry(); // Will trigger POST call
    if (error) {
      toast.error(error || "Failed to submit booking inquiry.");
    } else if (storeData?.status === true) {
      toast.success(storeData?.message);
      router.push("/dashboard");
    } else {
      toast.error(storeData?.message);
    }
  };

  useEffect(() => {
    fetchAirportCities();
    fetchMedicalAssistanceOptions();
    fetchAirCraftTypes();
    fetchCrewRequirements();
    fetchTravelingPurpose();
    fetchCateringDietaryOptions();
    fetchRequiredDocumentUploadOptions();
  }, []);

  const handleNextClick = () => setActiveStep((prev) => prev + 1);
  const handleBackClick = () => setActiveStep((prev) => prev - 1);

  const handleFinish = async () => {
    console.log(formatedFormData, 'mukesh');
    await storeBookingInquiryData();
  };

  return (
    <StepContext.Provider value={{ airportCity, formData, setFormData, radioTabActive, setRadioTabActive, medicalSupOptions, aircraftTypeOptions, crewRequirementOptions, travelingPurposeOption, cateringDietaryOptions, handleFinish, handleBackClick, handleNextClick, activeStep, setActiveStep, formatedFormData, setFormatedFormData, requiredDocumentUploadOptions }}>
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