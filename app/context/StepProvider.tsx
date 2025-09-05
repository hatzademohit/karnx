"use client";
import { apiBaseUrl } from "@/karnx/api";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// ---- TYPES ----
type FlightDetailsType = {
  trip_type?: string;
  departure_location?: any[];
  arrival_location?: any[];
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
  travel_purpose_id?: number;
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
  storeBookingInquiryData: (data: FormDataType) => Promise<any>;
};

// ---- CONTEXT ----
const StepContext = createContext<StepContextType | undefined>(undefined);

// ---- PROVIDER ----
export const StepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [airportCity, setAirportCity] = useState<any[]>([]);
  const [medicalSupOptions, setMedicalSupOptions] = useState<any[]>([]);
  const [aircraftTypeOptions, setAircraftTypeOptions] = useState<any[]>([]);
  const [crewRequirementOptions, setCrewRequirementOptions] = useState<any[]>([]);
  const [travelingPurposeOption, setTravelingPurposeOptions] = useState<any[]>([]);
  const [cateringDietaryOptions, setCateringDietaryOptions] = useState<any[]>([]);
  const [radioTabActive, setRadioTabActive] = useState<number>(0);
  const router = useRouter();
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
      travel_purpose_id: 0,
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

  const fetchAirportCities = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/form-fields-data/airport-cities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // your login token
        },
      });
      const data = await response.json();
      setAirportCity(data.data || []);
    } catch (error) {
      console.error("Error fetching airport cities:", error);
    }
  };

  const fetchMedicalAssistanceOptions = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/form-fields-data/medical-supports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // your login token  
        },
      });
      const data = await response.json();
      setMedicalSupOptions(data.data || []);
    } catch (error) {
      console.error("Error fetching medical assistance options:", error);
    }
  };

  const fetchAirCraftTypes = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/form-fields-data/aircraft-types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // your login token
        },
      });      
      const data = await response.json();
      setAircraftTypeOptions(data.data || []);
    } catch (error) {
      console.error("Error fetching aircraft options:", error);
    }
  };

  const fetchCrewRequirements = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/form-fields-data/crew-requirements`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // your login token
        },
      });      
      const data = await response.json();
      setCrewRequirementOptions(data.data || []);
    } catch (error) {
      console.error("Error fetching crew requirements:", error);
    }
  };
  const fetchTravelingPurpose = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/form-fields-data/travel-purposes`, {
        method: "GET",
        headers: {  
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // your login token
        },
      });      
      const data = await response.json();
      setTravelingPurposeOptions(data.data || []);
    } catch (error) {
      console.error("Error fetching traveling purpose options:", error);  
    }    
  };

  const fetchCateringDietaryOptions = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/form-fields-data/catering-dietary`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // your login token
        },
      });      
      const data = await response.json();
      setCateringDietaryOptions(data.data || []);
    } catch (error) {
      console.error("Error fetching catering dietary options:", error);
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

  const storeBookingInquiryData = async (data: FormDataType) => {
    try{
      const response = await fetch(`${apiBaseUrl}/booking-inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`, // your login token
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if(!response.ok) {
        toast.error(result.message || "Failed to submit booking inquiry.");
      }else{
        toast.success(result.message || "Booking inquiry submitted successfully!");
        router.push('/inquiries');
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit booking inquiry.");
      console.error("Error storing booking inquiry data:", error);
    }
  }
  return (
    <StepContext.Provider value={{ airportCity, formData, setFormData, radioTabActive, setRadioTabActive, medicalSupOptions, aircraftTypeOptions, crewRequirementOptions, travelingPurposeOption, cateringDietaryOptions, storeBookingInquiryData }}>
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
