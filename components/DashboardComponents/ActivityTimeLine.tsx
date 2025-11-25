import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { apiBaseUrl } from "@/karnx/api";
import { SingleSelectRadio } from "@/components";

const options = ['All Activities', 'Inquiries', 'Quotes', 'Bookings']

const ActivityTimeLine: React.FC = () => {
  const theme = useTheme();
  const [selectedActivity, setSelectedActivity] = useState('All Activities')
  const [activities, setActivitiesData] = useState([]);
  const [tasks, setTaskData] = useState([]);
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

  const fetchTasks = async () => {
    try {
      const url = `${apiBaseUrl}/dashboard/kxmanager-prioritytask`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        }
      });
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      const result = await response.json();
      setTaskData(result.data);
    } catch (err: any) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchActivitis();
    fetchTasks();
  }, []);
  return (
    <Box className='card'>
      <Box className='card-header'>
        <Typography component='h3' variant="h3" sx={{ color: theme?.common?.redColor }}>Activity Timeline</Typography>
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
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              p: 2,
              bgcolor: idx % 2 === 1 ? "#F7F7F9" : "#F9FAFB",
              borderRadius: 2,
              mb: 1.5,
            }}
          >
            <Box sx={{ mr: 2, mt: 0.5 }}>{item.icon}</Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.time}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {item.details}
              </Typography>
              <Typography variant="body2" color="error" fontWeight={500}>
                {item.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Button className="btn btn-blue" sx={{ maxWidth: '100%', width: '100%', mt: 2 }}> View All Activities </Button>
    </Box>

  );
};

export default ActivityTimeLine;
