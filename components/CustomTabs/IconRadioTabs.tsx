'use client'
import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface RadioTabsProps {
  children: React.ReactNode;
  defaultValue?: number;
  centered?: boolean;
  onchange?: (value: number) => void;
}

interface RadioTabProps {
  label: string;
  children: React.ReactNode;
  icon?: any;
}

function TabPanel({
  children,
  value,
  index,
}: {
  children?: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <Box role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </Box>
  );
}

function RadioTabs({ children, defaultValue = 0, centered = true, onchange }: RadioTabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onchange && onchange(newValue);
    setValue(newValue);
  };

  // Collect all <RadioTabs.Tab> children
  const tabs = React.Children.toArray(children) as React.ReactElement<RadioTabProps>[];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs header (radio style) */}
      <Tabs
        value={value}
        onChange={handleChange}
        centered={centered}
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          justifyContent: 'flex-start',
          gap: '50px',
          '& .MuiTabs-list': {
            justifyContent: 'flex-start'
          },
          "& .MuiTab-root": {
            textTransform: "none",
            display: 'flex',
            flexDirection: 'row',
            minHeight: 'unset',
            padding: 0,
            "&.Mui-selected": {
              color: "#0b3d91",
            },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab disableRipple key={index} icon={tab.props.icon} label={tab.props.label} />
        ))}
      </Tabs>

      {/* Tab content */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.props.children}
        </TabPanel>
      ))}
    </Box>
  );
}

// Subcomponent for API
RadioTabs.Tab = function RadioTab(_props: RadioTabProps) {
  return null; // Used only as config holder
};

export default RadioTabs;
