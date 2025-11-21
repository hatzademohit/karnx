import React from "react";
import { ViewQuotes, NoQuotes } from "@/components";

export interface QuoteTabsProps {
	travelTab?: boolean;
	inquiryId?: number;
}

const QuoteTabs: React.FC<QuoteTabsProps> = ({ travelTab = false, inquiryId }) => {

	return (
		<>
			<ViewQuotes />
			<NoQuotes />
		</>
	);
};

export default QuoteTabs;
