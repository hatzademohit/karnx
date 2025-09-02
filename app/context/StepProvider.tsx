"use client";
import { apiBaseUrl } from "@/karnx/api";
import React, { createContext, useContext, useEffect, useState } from "react";

// ---- TYPES ----
type FlightDetailsType = {
  trip_type: string;
  departure_location: string[];
  arrival_location: string[];
  departure_time: string[];
  flexible_range: string;
  is_flexible_dates: boolean;
};

type PassengerInfoType = {
  name: string;
  age: string;
};

type ContactInfoType = {
  email: string;
  phone: string;
};

export type FormDataType = {
  flightDetails: FlightDetailsType;
  passengerInfo: PassengerInfoType;
  contactInfo: ContactInfoType;
};

type StepContextType = {
  airportCity: any[];
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  radioTabActive: number;
  setRadioTabActive: React.Dispatch<React.SetStateAction<number>>;
};

// ---- CONTEXT ----
const StepContext = createContext<StepContextType | undefined>(undefined);

// ---- PROVIDER ----
export const StepProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [airportCity, setAirportCity] = useState<any[]>([]);
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
      name: "",
      age: "",
    },
    contactInfo: {
      email: "",
      phone: "",
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

  useEffect(() => {
    fetchAirportCities();
  }, []);

  return (
    <StepContext.Provider value={{ airportCity, formData, setFormData, radioTabActive, setRadioTabActive }}>
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
