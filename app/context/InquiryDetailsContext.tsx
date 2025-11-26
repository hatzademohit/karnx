import { createContext, useContext, useState } from "react"

interface InquiryDetailsContextType {
    assignedOperatorLength: number;
    setAssignedOperatorLength: React.Dispatch<React.SetStateAction<number>>
    showDetailsTabs?: boolean;
    setShowDetailsTabs?: React.Dispatch<React.SetStateAction<boolean>>
    inquiryId?: number | null;
    setInquiryId: React.Dispatch<React.SetStateAction<number | null>>
    inquiryRowData?: any | null;
    setinquiryRowData?: React.Dispatch<React.SetStateAction<any | null>>
}

export const InquiryDetailsContext = createContext<InquiryDetailsContextType | undefined>({
    assignedOperatorLength: 0,
    setAssignedOperatorLength: () => { },
    showDetailsTabs: false,
    setShowDetailsTabs: () => { },
    setInquiryId: () => { },
    inquiryId: null,
    inquiryRowData: [],
    setinquiryRowData: () => { },
})

export const InquiryDetailsProvider = ({ children }: { children: React.ReactNode }) => {

    const [assignedOperatorLength, setAssignedOperatorLength] = useState<number>(0)
    const [showDetailsTabs, setShowDetailsTabs] = useState<boolean>(false)
    const [inquiryId, setInquiryId] = useState<number | null>(null);
    const [inquiryRowData, setinquiryRowData] = useState<any | null>([]);

    return (
        <InquiryDetailsContext.Provider value={{ assignedOperatorLength, setAssignedOperatorLength, showDetailsTabs, setShowDetailsTabs, inquiryId, setInquiryId, inquiryRowData, setinquiryRowData }}>
            {children}
        </InquiryDetailsContext.Provider>
    )
}

export const useInquiryDetails = () => useContext(InquiryDetailsContext)