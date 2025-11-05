import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{ padding: "15px 0", backgroundColor: "#fff", borderRadius: "0 0 8px 8px" }}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

interface CustomTabsProps {
  children: React.ReactNode;
  defaultValue?: number;
}

interface CustomTabProps {
  label: string;
  children: React.ReactNode;
}

const CustomTabs: React.FC<CustomTabsProps> & { Tab: React.FC<CustomTabProps> } = ({
  children,
  defaultValue = 0,
}) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabsArray = React.Children.toArray(children) as React.ReactElement<CustomTabProps>[];

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile className="custom-tabs">
        {tabsArray.map((child, idx) => (
          <Tab key={idx} label={child.props.label} id={`tab-${idx}`} aria-controls={`tabpanel-${idx}`} />
        ))}
      </Tabs>

      {tabsArray.map((child, idx) => (
        <TabPanel key={idx} value={value} index={idx}>
          {child.props.children}
        </TabPanel>
      ))}
    </Box>
  );
};

CustomTabs.Tab = ({ children }: CustomTabProps) => <>{children}</>;

export default CustomTabs;
