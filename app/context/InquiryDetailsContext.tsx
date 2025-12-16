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
    bookingDetails: any;
    setbookingDetails: React.Dispatch<React.SetStateAction<any>>
    createNewQuote: boolean;
    setCreateNewQuote: React.Dispatch<React.SetStateAction<boolean>>
    quoteDetails: any;
    setQuoteDetails: React.Dispatch<React.SetStateAction<any>>
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
    bookingDetails: [],
    setbookingDetails: () => { },
    createNewQuote: false,
    setCreateNewQuote: () => { },
    quoteDetails: [],
    setQuoteDetails: () => { }
})

export const InquiryDetailsProvider = ({ children }: { children: React.ReactNode }) => {

    const [assignedOperatorLength, setAssignedOperatorLength] = useState<number>(0)
    const [showDetailsTabs, setShowDetailsTabs] = useState<boolean>(false)
    const [inquiryId, setInquiryId] = useState<number | null>(null);
    const [inquiryRowData, setinquiryRowData] = useState<any | null>([]);
    const [bookingDetails, setbookingDetails] = useState<any>([]);
    const [createNewQuote, setCreateNewQuote] = useState<boolean>(false);
    const [quoteDetails, setQuoteDetails] = useState<any>([]);

    return (
        <InquiryDetailsContext.Provider value={{ assignedOperatorLength, setAssignedOperatorLength, showDetailsTabs, setShowDetailsTabs, inquiryId, setInquiryId, inquiryRowData, setinquiryRowData, bookingDetails, setbookingDetails, createNewQuote, setCreateNewQuote, quoteDetails, setQuoteDetails }}>
            {children}
        </InquiryDetailsContext.Provider>
    )
}

export const useInquiryDetails = () => useContext(InquiryDetailsContext)