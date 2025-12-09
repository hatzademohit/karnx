import * as yup from "yup";

export const oneWaySchema = yup.object({
  oneWayfrom: yup.string().nullable().required("Departure is required"),
  oneWayto: yup.string().nullable().required("Destination is required"),
  oneWaydepartureDate: yup.string().when("isFlexibleDates", {
    is: true,
    then: schema => schema.notRequired(),
    otherwise: schema => schema.required("Departure date is required"),
  }),
  // flexibleRange: yup.string().nullable().when('isFlexibleDates', {
  //   is: false,
  //   then: schema => schema.notRequired(),
  //   otherwise: schema => schema.required("Please enter specifics"),
  // })
});

export const roundTripSchema = yup.object({
  roundTripfrom: yup.string().required("Departure is required"),
  roundTripto: yup.string().required("Destination is required"),
  roundTripdepartureDate: yup.string().when("isFlexibleDates", {
    is: true,
    then: schema => schema.notRequired(),
    otherwise: schema => schema.required("Departure date is required"),
  }),
  roundTripfromReturn: yup.string().required("Departure is required"),
  roundTriptoReturn: yup.string().required("Destination is required"),
  roundTripreturnDate: yup.string().when("isFlexibleDates", {
    is: true,
    then: schema => schema.notRequired(),
    otherwise: schema => schema.required("Return date is required"),
  }),
  // flexibleRange: yup.string().nullable().when('isFlexibleDates', {
  //   is: false,
  //   then: schema => schema.notRequired(),
  //   otherwise: schema => schema.required("Please enter specifics"),
  // })
});

export const multiCitySchema = yup.object({
  multiCity: yup.array().when("isFlexibleDates", {
    is: true,
    then: schema =>
      schema.of(
        yup.object({
          multiCityfrom: yup.string().required("Departure is required"),
          multiCityto: yup.string().required("Destination is required"),
          multiCitydepartureDate: yup.string().notRequired(),
        })
      ),
    otherwise: schema =>
      schema.of(
        yup.object({
          multiCityfrom: yup.string().required("Departure is required"),
          multiCityto: yup.string().required("Destination is required"),
          multiCitydepartureDate: yup.string().required("Departure date is required"),
        })
      ),
  }),
  multiCityfromReturn: yup.string().required("Departure is required"),
  multiCitytoReturn: yup.string().required("Destination is required"),
  multiCityreturnDate: yup.string().when("isFlexibleDates", {
    is: true,
    then: schema => schema.notRequired(),
    otherwise: schema => schema.required("Return date is required"),
  }),
  // flexibleRange: yup.string().nullable().when('isFlexibleDates', {
  //   is: false,
  //   then: schema => schema.notRequired(),
  //   otherwise: schema => schema.required("Please enter specifics"),
  // })
});

export type passengerAircraftSchemaType = {
  adults: number,
  children: number,
  infants: number,
  totalPassengers: number;
  // 
  isTravellingWithPets: boolean;
  petType: string;
  petSize: string;
  petAdditionalNotes: string;
  //
  isMedicalAssistanceReq: boolean;
  specialAssistance: string;
  checkedBags: any;
  carryOnBags: any;
  overSizedItems: any;
  // 
  preferredService: string;
  // 
  crewRequirements: string;
  additionalNotes: string;
  // 

  crewCount: number;
  travelPurpose: string;
  cateringType: string;
  documentFile: FileList;
  requiredDocumentUploaded: any[];
  // 
  cateringDietary: string[];
  allergies: string;
  drinkPreferences: string;
  customServices: string;
};

export const passengerAircraftSchema = yup.object().shape({
  adults: yup.number(),
  children: yup.number(),
  infants: yup.number(),
  totalPassengers: yup.string().required("Total passengers is required").min(1, "At least one passenger required"),
  // 
  isTravellingWithPets: yup.boolean(),
  petType: yup.string().when("isTravellingWithPets", {
    is: true,
    then: schema => schema.required("Pet Type is required"),
    otherwise: schema => schema.notRequired(),
  }),
  petSize: yup.string().when("isTravellingWithPets", {
    is: true,
    then: schema => schema.required("Pet Size is required"),
    otherwise: schema => schema.notRequired(),
  }),
  petAdditionalNotes: yup.string().when("isTravellingWithPets", {
    is: true,
    then: schema => schema.required("Please provide special requirements"),
    otherwise: schema => schema.notRequired(),
  }),
  // 
  isMedicalAssistanceReq: yup.boolean(),

  specialAssistance: yup.array().when('isMedicalAssistanceReq', {
    is: true,
    then: (schema) =>
      schema
        .min(1, 'Please select at least one assistance option')
        .required('Please select at least one assistance option'),
    otherwise: (schema) => schema.notRequired(),
  }),

  otherAssistance: yup.string().when("specialAssistance", ([specialAssistance], schema) => {
    if (Array.isArray(specialAssistance) && specialAssistance.includes(6)) {
      return schema.required("Other Assistance is required when 'Other' is selected");
    }
    return schema.notRequired();
  }),
  // 
  checkedBags: yup.number().typeError('Only number are allowed').required("Please select checked bags").integer("Only whole numbers are allowed").min(0, "Value cannot be negative"),
  carryOnBags: yup.number().typeError('Only number are allowed').required("Please select carry on bags").integer("Only whole numbers are allowed").min(0, "Value cannot be negative"),
  overSizedItems: yup.string().required("Please select over sized items"),
  // 
  preferredServices: yup.array()
    .min(1, "Please select at least one preferred service") // Ensure at least one item is selected
    .default([]), // Default value as an empty array

  // 
  crewRequirements: yup.object().shape({
    cabin_crew_pref_id: yup.string(),
    pilot_experience_id: yup.string(),
    medical_crew_id: yup.string(),
    language_skills_id: yup.string(),
    concierge_skills_id: yup.string(),
  }),
  additionalNotes: yup.string(),
  // 
  travelPurpose: yup.string().required("Please select a purpose of travel"),
  // 
  isCateringRequired: yup.boolean(),
  cateringDietary: yup.array().when('isCateringRequired', {
    is: true,
    then: (schema) =>
      schema
        .min(1, 'Please select at least one dietary requirement')
        .required('Please select at least one dietary requirement'),
    otherwise: (schema) => schema.notRequired(),
  }),

  allergies: yup.string().when("isCateringRequired", {
    is: true, then: (schema) =>
      schema.required("Please enter allergies & dietary restrictions"),
    otherwise: (schema) => schema.notRequired(),
  }),
  drinkPreferences: yup.string().when("isCateringRequired", {
    is: true, then: (schema) =>
      schema.required("Please enter drink preferences"),
    otherwise: (schema) => schema.notRequired(),
  }),
  customServices: yup.string().when("isCateringRequired", {
    is: true, then: (schema) =>
      schema.required("Please enter custom services"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // 
  documentFile: yup
    .mixed<File[]>() // Expecting an array of files
    .nullable().notRequired(),
  // .test("file-required", "Please upload a document", (value) => {
  //   return Array.isArray(value) && value.length > 0;
  // }),

  requiredDocumentUploaded: yup.array().nullable().notRequired().default([]), // Default value as an empty array
});

export type contactSummarySchemaType = {
  specialRequirements: string;
}

export const contactSummarySchema = yup.object().shape({
  specialRequirements: yup.string().notRequired(),
});

// company priofile schema

export const CompanyProfileSchema = yup.object().shape({
  clientName: yup.string().required('Company Name is required'),
  safetyRating: yup.string().required('Safety Rating is required'),
  responseTime: yup.string().required('Response Time is required'),
  operatingRegions: yup.array().required('Operating Regions is required').nonNullable(),
  certification: yup.string().required('Certification is required'),
  specialtie: yup.string().required('Specialtie is required'),
  contactPerson: yup.string().required('Contact Person is required'),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().required("Phone is required").matches(/^\d{10}$/, "Phone must be exactly 10 digits"),
  // website: yup.string().url("Invalid URL").required('Website is required'),
  website: yup.string().transform((value) => {
    if (!value) return value;
    // If missing protocol → add https://
    if (!/^https?:\/\//i.test(value)) {
      return `https://${value}`;
    }
    return value;
  }).url("Please enter a valid URL").required("Website is required"),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string().nullable(),
  area: yup.string().required('Area is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  pinCode: yup.string().required('Pin Code is required'),
})

export const travelAgentSchema = yup.object({
  adults: yup.array().of(
    yup.object({
      name: yup.string().required("Name is required"),
      age: yup.number().required("Age required").min(12).max(100)
    })
  ),
  children: yup.array().of(
    yup.object({
      name: yup.string().required(),
      age: yup.number().required().min(2).max(11),
    })
  ),
  infants: yup.array().of(
    yup.object({
      name: yup.string().required(),
      age: yup.number().required().min(0).max(2),
    })
  ),
  // contact detail
  contact_name: yup.string().required('Name is required'),
  contact_email: yup.string().required('Email is required').email("Invalid email"),
  contact_phone: yup.string().required("Phone number required").matches(/^\d{10}$/, "Phone must be exactly 10 digits"),
  // billing address
  pincode: yup.string().required("Pin Code is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),

  // gstin
  enableGST: yup.boolean(),
  gstin: yup.string().when("enableGST", {
    is: true,
    then: (schema) => schema.required("GST Number required").matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GSTIN format"
    ).length(15, "GSTIN must be 15 characters"),
    otherwise: (schema) => schema.optional(),
  }),
});