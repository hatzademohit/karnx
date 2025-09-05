"use client";
import { apiBaseUrl } from "@/karnx/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/karnx/Hooks/useApi";

// ---- TYPES ----
type FlightDetailsType = {
  trip_type?: string;
  departure_location?: string[];
  arrival_location?: string[];
  departure_time?: string[];
  flexible_range?: string;
  is_flexible_dates?: boolean;
};

type PassengerInfoType = {
  passanger_info_adults?: number;
  passanger_info_children?: number;
  passanger_info_infants?: number;
  passenger_info_total?: string;
  is_traveling_pets?: boolean;
  is_medical_assistance_req?: boolean;
  checked_bag?: number;
  carry_bag?: number;
  oversized_items?: string;
  travel_purpose_ids?: number;
  is_catering_service_req?: boolean;  
  pet_travels?: {
        pet_type?: string;
        pet_size?: string;
        additional_notes?: string;
      };
  medical_assistance?: {
    medical_assist_id?: number;
    other_requirements?: string;
  };
  aircraft_preference?: string[];
  crew_requirements?: {
    services?: { [key: string]: number }[];
    additional_notes?: string;
  };
  catering_services?: {
    dietary_required?: string[];
    allergy_notes?: string;
    drink_preferences?: string;
    custom_services?: string;

  };

};

type ContactInfoType = {
  contact_information?: {
    contact_name?: string;
    contact_email?: string;    
    contact_number?: string;
    contact_phone?: string;
    special_requirements?: string;
  };
};

export type FormDataType = {
  flightDetails?: FlightDetailsType;
  passengerInfo?: PassengerInfoType;
  contactInfo?: ContactInfoType;
};

type StepContextType = {
  airportCity: any[];
  medicalSupOptions: any[];
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  radioTabActive: number;
  setRadioTabActive: React.Dispatch<React.SetStateAction<number>>;  
  aircraftTypeOptions?: any[];
  crewRequirementOptions?: any[];
  travelingPurposeOption?: any[];
  cateringDietaryOptions?: any[];
};

// ---- CONTEXT ----
const StepContext = createContext<StepContextType | undefined>(undefined);

// ---- PROVIDER ----
export const StepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [radioTabActive, setRadioTabActive] = useState<number>(0);

  const [formData, setFormData] = useState<FormDataType>({
    flightDetails: {
      trip_type: "",
      departure_location: [],
      arrival_location: [],
      departure_time: [],
      flexible_range: "",
      is_flexible_dates: false,
    },
    passengerInfo: {
      passanger_info_adults: 1,
      passanger_info_children: 0,
      passanger_info_infants: 0,
      passenger_info_total: "",
      is_traveling_pets: false,
      is_medical_assistance_req: false,
      checked_bag: 0,
      carry_bag: 0,
      oversized_items: "",
      travel_purpose_ids: 0,
      is_catering_service_req: false,
      pet_travels: {
        pet_type: "",
        pet_size: "",
        additional_notes: "",
      },
      medical_assistance: {
        medical_assist_id: 0,
        other_requirements: "",
      },
      aircraft_preference:[],
      crew_requirements: {
        services: [],
        additional_notes: ""
      },
      catering_services: {
        dietary_required: [],
        allergy_notes: "",
        drink_preferences: "",
        custom_services: "",
      }
      
    },
    contactInfo: {
      contact_information: {
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        special_requirements: "",
      },
    },
  });

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

  useEffect(() => {
    fetchAirportCities();
    fetchMedicalAssistanceOptions();
    fetchAirCraftTypes();
    fetchCrewRequirements(); 
    fetchTravelingPurpose();
    fetchCateringDietaryOptions();
  }, []);

  return (
    <StepContext.Provider value={{ airportCity, formData, setFormData, radioTabActive, setRadioTabActive, medicalSupOptions, aircraftTypeOptions, crewRequirementOptions, travelingPurposeOption, cateringDietaryOptions }}>
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
