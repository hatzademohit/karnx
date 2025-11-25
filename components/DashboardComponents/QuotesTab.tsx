import React from "react";
import { ViewQuotes, NoQuotes } from "@/components";
import { useAuth } from "@/app/context/AuthContext";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";

export interface QuoteTabsProps {
	travelTab?: boolean;
	inquiryId?: number;
}

const QuoteTabs: React.FC<QuoteTabsProps> = ({ travelTab = false, inquiryId }) => {
	const { user } = useAuth()
	const { inquiryRowData } = useInquiryDetails();
	const inqStsId = inquiryRowData?.status_id;

	return (
		<>
			{[5, 10, 11, 12, 13, 14, 6, 7].includes(inqStsId) &&
				<ViewQuotes />
			}
			{[2, 3, 4].includes(inqStsId) &&
				<NoQuotes />
			}
		</>
	);
};

export default QuoteTabs;
