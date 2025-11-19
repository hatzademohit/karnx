import { createContext, useContext, useState } from "react"

interface InquiryDetailsContextType {
    assignedOperatorLength: number;
    setAssignedOperatorLength: React.Dispatch<React.SetStateAction<number>>
}

export const InquiryDetailsContext = createContext<InquiryDetailsContextType | undefined>({
    assignedOperatorLength: 0,
    setAssignedOperatorLength: () => { }
})

export const InquiryDetailsProvider = ({ children } : { children: React.ReactNode }) => {

    const [assignedOperatorLength, setAssignedOperatorLength] = useState<number>(0)

    return(
        <InquiryDetailsContext.Provider value={{ assignedOperatorLength, setAssignedOperatorLength }}>
            {children}
        </InquiryDetailsContext.Provider>
    )
}

export const useInquiryDetails = () => useContext(InquiryDetailsContext)