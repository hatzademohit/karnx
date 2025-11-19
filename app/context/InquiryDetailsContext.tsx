import { createContext, useContext, useState } from "react"

interface InquiryDetailsContextType {
    assignedOperatorLength: number;
    setAssignedOperatorLength: React.Dispatch<React.SetStateAction<number>>
    showDetailsTabs?: boolean;
    setShowDetailsTabs?: React.Dispatch<React.SetStateAction<boolean>>
}

export const InquiryDetailsContext = createContext<InquiryDetailsContextType | undefined>({
    assignedOperatorLength: 0,
    setAssignedOperatorLength: () => { },
    showDetailsTabs: false,
    setShowDetailsTabs: () => { },
})

export const InquiryDetailsProvider = ({ children }: { children: React.ReactNode }) => {

    const [assignedOperatorLength, setAssignedOperatorLength] = useState<number>(0)
    const [showDetailsTabs, setShowDetailsTabs] = useState<boolean>(false)

    return (
        <InquiryDetailsContext.Provider value={{ assignedOperatorLength, setAssignedOperatorLength, showDetailsTabs, setShowDetailsTabs }}>
            {children}
        </InquiryDetailsContext.Provider>
    )
}

export const useInquiryDetails = () => useContext(InquiryDetailsContext)