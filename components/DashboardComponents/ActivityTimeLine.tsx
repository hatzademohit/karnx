import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useTheme, Divider } from "@mui/material";
import { apiBaseUrl } from "@/karnx/api";
import { SingleSelectRadio } from "@/components";

const options = ['All Activities', 'Inquiries', 'Quotes', 'Bookings']

const ActivityTimeLine: React.FC = () => {
  const theme = useTheme();
  const [selectedActivity, setSelectedActivity] = useState('All Activities')
  const [activities, setActivitiesData] = useState([]);
  const fetchActivitis = async () => {
    try {
      const url = `${apiBaseUrl}/dashboard/kxmanager-activitytimeline`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        }
      });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const result = await response.json();
      setActivitiesData(result.data);
    } catch (err: any) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchActivitis();
  }, []);
  return (
    <Box className='card'>
      <Box className='card-header'>
        <Typography component='h4' variant="h4" sx={{ color: theme?.common?.redColor }}>Activity Timeline</Typography>
        <SingleSelectRadio
          size="small"
          variant="filled"
          options={options}
          value={selectedActivity}
          onChange={(value: any) => setSelectedActivity(value)}
          className="select_filter"
          menuClassName="custom-select-dropdown"
        />
      </Box>

      <Box className="card-body" sx={{ maxHeight: '260px', overflowY: 'auto' }}>
        {activities.map((item, idx) => (
          <React.Fragment key={item?.id}>
            {idx != 0 && <Divider className="cust-divider" />}
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "stretch",
                borderRadius: 2,
                mb: 1.5,
              }}
            >
              <Box className="botted-border" sx={{ borderLeft: `2px solid ${theme?.common?.borderColor}` }}></Box>
              <Box sx={{ padding: '10px 5px 0 0', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" component='h5'>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.time}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {item.details}
                </Typography>
                <Typography variant="body2" color="error" className="fs14">
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Box>

      <Button className="btn btn-blue" sx={{ maxWidth: '100%', width: '100%', mt: 2 }}> View All Activities </Button>
    </Box>

  );
};

export default ActivityTimeLine;
