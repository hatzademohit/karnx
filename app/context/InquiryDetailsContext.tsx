import useApiFunction from "@/karnx/Hooks/useApiFunction";
import { createContext, useContext, useEffect, useState } from "react"
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";

interface InquiryDetailsContextType {
    assignedOperatorLength: number;
    setAssignedOperatorLength: React.Dispatch<React.SetStateAction<number>>
    showDetailsTabs?: boolean;
    setShowDetailsTabs?: React.Dispatch<React.SetStateAction<boolean>>
    aircraftList: any;
    cancellationPolicyList: any;
    amentiesList: any;
}

export const InquiryDetailsContext = createContext<InquiryDetailsContextType | undefined>({
    assignedOperatorLength: 0,
    setAssignedOperatorLength: () => { },
    showDetailsTabs: false,
    setShowDetailsTabs: () => { },
    aircraftList: [],
    cancellationPolicyList: [],
    amentiesList: [],
})

export const InquiryDetailsProvider = ({ children }: { children: React.ReactNode }) => {

    const callApi = useApiFunction();
    const [assignedOperatorLength, setAssignedOperatorLength] = useState<number>(0)
    const [showDetailsTabs, setShowDetailsTabs] = useState<boolean>(false)
    const [aircraftList, setAircraftList] = useState<any>([]);
    const [cancellationPolicyList, setcancellationPolicyList] = useState<any>([]);
    const [amentiesList, setAmentiesListList] = useState<any>([]);

    const getAircrafts = async () => {
        try {
            const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/inquiry-quotes/get-aircraft` });
            if (res?.status === true) {
                setAircraftList(res.data);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            toast.error('Network error while fetching aircraft');
        }
    };

    const getCancellationPolicies = async () => {
        try {
            const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/form-fields-data/cancelation-policies` });
            if (res?.status === true) {
                setcancellationPolicyList(res.data);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {
            toast.error('Network error while fetching cancellation policies');
        }
    };

    const getAvailableAmenties = async () => {
        try {
            const res = await callApi({ method: 'GET', url: `${apiBaseUrl}/form-fields-data/available-amenities` });
            if (res?.status === true) {
                setAmentiesListList(res.data);
            } else {
                toast.error(res?.message || '');
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        getAircrafts();
        getCancellationPolicies();
        getAvailableAmenties()
    }, []);

    return (
        <InquiryDetailsContext.Provider value={{ assignedOperatorLength, setAssignedOperatorLength, showDetailsTabs, setShowDetailsTabs, aircraftList, cancellationPolicyList, amentiesList }}>
            {children}
        </InquiryDetailsContext.Provider>
    )
}

export const useInquiryDetails = () => useContext(InquiryDetailsContext)