"use client";
import { apiBaseUrl } from "@/karnx/api";
import React, { createContext, useContext, useEffect, useState } from "react";

const StepContext = createContext({
  airportCity: [],
  formData: {},
  setFormData: {},
});


export const StepProvider = ({ children }) => {
  const [airportCity, setairportCity] = useState([]);
    
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
  const [formData, setFormData] = useState({
    flightDetails: {
      trip_type: "",
      departure_location: "",
      arrival_location: "",
      departure_time: "",
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
  return (
    <StepContext.Provider value={{ airportCity, formData, setFormData }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => useContext(StepContext);
