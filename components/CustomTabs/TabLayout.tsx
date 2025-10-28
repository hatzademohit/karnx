import React, { useState } from "react";
import { Tabs, Tab, Box, useTheme } from "@mui/material";

interface TabItem {
  label: string;
  icon?: any;
  content: React.ReactNode;
}

interface TabLayoutProps {
  tabs: TabItem[];
  defaultValue?: number;
  sx?: any;
  indicatorColor?: string;
  selectedColor?: string;
  smallTabs?: boolean;
}

const TabLayout: React.FC<TabLayoutProps> = ({
  tabs,
  defaultValue = 0,
  sx = {},
  indicatorColor,
  selectedColor,
  smallTabs = true,
}) => {
  const [tabValue, setTabValue] = useState(defaultValue);
  const theme = useTheme();

  const handleTabChange = (_: any, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
          minHeight: smallTabs ? 36 : 48,
          "& .MuiTabs-flexContainer": { gap: 0.5 },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            fontSize: smallTabs ? "0.8rem" : "0.9rem",
            minHeight: smallTabs ? 36 : 48,
            padding: smallTabs ? "4px 12px" : "8px 16px",
            minWidth: "auto",
          },
          "& .MuiTab-iconWrapper": { fontSize: "1rem", marginRight: 6 },
          "& .Mui-selected": {
            color: `${selectedColor || theme?.common?.redColor} !important`,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: indicatorColor || theme?.common?.redColor,
          },
          ...sx,
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>

      <Box mt={2}>{tabs[tabValue]?.content}</Box>
    </Box>
  );
};

export default TabLayout;
