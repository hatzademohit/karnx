import React from "react";
import { Box, Typography, Chip, Stack, useTheme } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { TabLayout } from "@/components";
import { InquiryDetailsTab, OperatorsTab, QuoteTabs } from "@/components/DashboardComponents";
import { useInquiryDetails } from "@/app/context/InquiryDetailsContext";
import { useAuth } from "@/app/context/AuthContext";

export interface InquiryDetailsProps {
  inquiryData: any;
  hideOperatorTabs?: boolean;
  itsTravelAgent?: boolean;
}
const InquiryDetails: React.FC<InquiryDetailsProps> = ({ inquiryData, hideOperatorTabs, itsTravelAgent }) => {
  const theme = useTheme();
  const { assignedOperatorLength, inquiryRowData } = useInquiryDetails();
  const { user } = useAuth()
  const tabs = [
    {
      label: "Inquiry Details",
      icon: <InsertDriveFileOutlinedIcon fontSize="small" />,
      content: <InquiryDetailsTab inquiryId={inquiryData.id} />,
    },
    ...(!hideOperatorTabs
      ? [
        {
          label: `Operators (${inquiryRowData.operator_assigned || assignedOperatorLength})`,
          icon: <SettingsOutlinedIcon fontSize="small" />,
          content: <OperatorsTab inquiryId={inquiryData.id} />,
        },
      ]
      : []),
    {
      label: `Quotes ${user.access_type !== 'Aircraft Operator' ? `(${inquiryRowData.quote_received})` : ''}`,
      icon: <MonetizationOnOutlinedIcon fontSize="small" />,
      content: <QuoteTabs travelTab={itsTravelAgent} inquiryId={inquiryData.id} />,
    },
  ];

  return (
    <Box sx={{ padding: { md: 2, xs: '10px' }, border: '1px solid #E6E6E6' }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" color={theme?.common?.blueColor}>
            {inquiryData?.inquiryId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created on {inquiryData?.created_on}
          </Typography>
        </Box>
        <Chip label={inquiryData?.status} color="info" variant="filled" />
      </Stack>

      {/* Tabs */}
      <TabLayout
        tabs={tabs}
        indicatorColor={theme?.common?.redColor}
        selectedColor={theme?.common?.redColor}
        smallTabs
      />
    </Box>
  );
};

export default InquiryDetails;
