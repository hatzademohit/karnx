import React from "react";
import { ViewQuotes, NoQuotes, TravelAgentQuoteView } from "@/components";
import { useAuth } from "@/app/context/AuthContext";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import { Grid } from "@mui/material";

export interface QuoteTabsProps {
	travelTab?: boolean;
	inquiryId?: number;
}

const QuoteTabs: React.FC<QuoteTabsProps> = ({ travelTab = false, inquiryId }) => {
	const { user } = useAuth()
	const { inquiryRowData } = useInquiryDetails();
	const inqStsId = inquiryRowData?.status_id;
	const statusIdViewQuote = [5, 11, 12, 13, 14, 15, 6, 7, 8, 9];
	const statusIdNoQuote = [1, 2, 3, 4];
	const statusIdTravelAgentQuote = [10, 11, 12, 13, 14, 15];
	return (
		<>
			{statusIdViewQuote.includes(inqStsId) && user.access_type !== 'Aircraft Travel Agent' &&
				<ViewQuotes />
			}

			{user.access_type === 'Aircraft Travel Agent' && statusIdTravelAgentQuote.includes(inqStsId) &&
				<TravelAgentQuoteView />
			}
			{statusIdNoQuote.includes(inqStsId) &&
				<NoQuotes />
			}
		</>
	);
};

export default QuoteTabs;
