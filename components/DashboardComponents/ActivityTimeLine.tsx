"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useTheme, Divider } from "@mui/material";
import { apiBaseUrl } from "@/karnx/api";
import { SingleSelectRadio } from "@/components";

type Activity = {
  id: string | number;
  title: string;
  time: string;
  details: string;
  subtitle?: string;
  inquiryId?: string;
};

type ActivityTimeLineProps = {
  onActivityClick?: (activity: Activity) => void;
};

const options = ['All Activities', 'Inquiries', 'Quotes', 'Bookings']

const ActivityTimeLine: React.FC<ActivityTimeLineProps> = ({ onActivityClick }) => {
  const theme = useTheme();
  const [selectedActivity, setSelectedActivity] = useState('All Activities')
  const [activities, setActivitiesData] = useState<Activity[]>([]);

  const fetchActivities = async () => {
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
      // API returns data as an object keyed by string numbers; convert to array
      const raw = result?.data;
      const arr: Activity[] = raw && typeof raw === 'object' && !Array.isArray(raw)
        ? Object.values(raw) as Activity[]
        : Array.isArray(raw)
          ? raw as Activity[]
          : [];
      // Optional: sort by id descending if needed
      // arr.sort((a, b) => Number(b.id) - Number(a.id));
      setActivitiesData(arr);
    } catch (err: any) {
      console.error(err);
    }
  }

  const viewAllActivities = (activitiesList: Activity[]) => () => {

  }
  useEffect(() => {
    fetchActivities();
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
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Loaded activities: {activities.length}
        </Typography>
        {Array.isArray(activities) && activities.length > 0 ? (
          activities.slice(0, 5).map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx !== 0 && <Divider className="cust-divider" />}
              <Box
                onClick={() => onActivityClick?.(item)}
                sx={{
                  cursor: 'pointer',
                  display: "flex",
                  alignItems: "stretch",
                  borderRadius: 2,
                  mb: 1.5,
                  '&:hover': { backgroundColor: 'action.hover' }
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
                    {item.inquiryId} • {item.details}
                  </Typography>
                  <Typography variant="body2" color="error" className="fs14">
                    {item.subtitle}
                  </Typography>
                </Box>
              </Box>
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No activities</Typography>
        )}
      </Box>

      <Button className="btn btn-blue" sx={{ maxWidth: '100%', width: '100%', mt: 2 }} onClick={viewAllActivities(activities)}> View All Activities </Button>
    </Box>

  );
};

export default ActivityTimeLine;
