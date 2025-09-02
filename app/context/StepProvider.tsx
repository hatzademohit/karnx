"use client";
import { apiBaseUrl } from "@/karnx/api";
import React, { createContext, useContext, useEffect, useState } from "react";

const StepContext = createContext({
  airportCity: [],
  formData: {},
  setFormData: {},
  radioTabActive: 0,
  setRadioTabActive: (value: number) => {},
});

type FormDataType = {
  flightDetails: {
    trip_type: string;
    departure_location: string[];
    arrival_location: string[];
    departure_time: string[];
    flexible_range: string;
    is_flexible_dates: boolean;
  };
  passengerInfo: {
    name: string;
    age: string;
  };
  contactInfo: {
    email: string;
    phone: string;
  };
};


export const StepProvider = ({ children }) => {
  const [airportCity, setairportCity] = useState([]);
    const [radioTabActive, setRadioTabActive] = useState<number>();
    const fetchAirportCities = async () => {
        try {
          const response = await fetch(`${apiBaseUrl}/form-fields-data/airport-cities`,
                        {
                            method: "GET",
                            headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.token}`, // 👈 your login token
                            },
                        }
                );
          const data = await response.json();
          //console.log(data.data);
          const fetchCities = data.data;//.map((city: any) => [{"label":city.code, "id":city.id}]); 
          //console.log(fetchCities);
          setairportCity(fetchCities);
        } catch (error) {
          console.error('Error fetching airport cities:', error);
        }
      };

     useEffect(() => {
        fetchAirportCities();
      }, []);

    // store all form data here
  const [formData, setFormData] = useState<FormDataType>({
    flightDetails: {
      trip_type: "",
      departure_location: [],
      arrival_location: [],
      departure_time: [],
      flexible_range: "",
      is_flexible_dates: false
    },
    passengerInfo: {
      name: "",
      age: ""
    },
    contactInfo: {
      email: "",
      phone: ""
    }
  });

  useEffect(() => {
    console.error("Form Data Updated:", formData);
  }, [formData]);
  
  return (
    <StepContext.Provider value={{ airportCity, formData, setFormData, radioTabActive, setRadioTabActive }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => useContext(StepContext);
