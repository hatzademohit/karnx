import React from "react";
import { Box, Typography, Chip, Stack, useTheme } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { TabLayout } from "@/components";
import { InquiryDetailsTab } from "@/components/DashboardComponents";

const InquiryDetails = ({ inquiryData }: any) => {
  const theme = useTheme();

  const tabs = [
    {
      label: "Inquiry Details",
      icon: <InsertDriveFileOutlinedIcon fontSize="small" />,
      content: <InquiryDetailsTab inquiryTabData={inquiryData} />,
    },
    {
      label: "Operators (2)",
      icon: <SettingsOutlinedIcon fontSize="small" />,
      content: <>operators tab content</>,
    },
    {
      label: "Quotes (3)",
      icon: <MonetizationOnOutlinedIcon fontSize="small" />,
      content: <>quote tab content</>,
    },
  ];

  return (
    <Box sx={{ paddingBlock: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" color={theme?.common?.blueColor}>
            {inquiryData?.inquiryId}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created on {inquiryData?.inquiryDate}
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
