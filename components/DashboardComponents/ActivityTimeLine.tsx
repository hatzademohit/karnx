import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { AccessTime, Warning, Flight, AttachMoney, Notifications } from "@mui/icons-material";
import { apiBaseUrl } from "@/karnx/api";

// const activities = [
//   {
//     id: 1,
//     icon: <Flight color="primary" />,
//     title: "New inquiry received",
//     time: "2 minutes ago",
//     details: "DEL → BOM, October 25, 2025 • 4 passengers",
//     subtitle: "Harrison Industries",
//   },
//   {
//     id: 2,
//     icon: <Warning color="error" />,
//     title: "Urgent: Quote expiring soon",
//     time: "32 minutes ago",
//     details: "Client decision needed within 2 hours",
//     subtitle: "Meridian Holdings",
//   },
//   {
//     id: 3,
//     icon: <AttachMoney color="success" />,
//     title: "Quote received from operator",
//     time: "15 minutes ago",
//     details: "Elite Aviation responded to INQ–2024–0847",
//     subtitle: "Sterling Corp",
//   },
// ];

// const tasks = [
//   {
//     id: 1,
//     icon: <Warning color="error" />,
//     title: "Overdue Operator Response",
//     details: "Premium Jets – 6 hours overdue",
//     ref: "INQ–2024–0842",
//     priority: "High",
//     bg: "#F4FBF6",
//   },
//   {
//     id: 2,
//     icon: <AccessTime color="warning" />,
//     title: "Quote Expiring Soon",
//     details: "Client decision needed in 1.5 hours",
//     ref: "INQ–2024–0839",
//     priority: "High",
//     bg: "#F7F7F9",
//   },
//   {
//     id: 3,
//     icon: <Notifications color="primary" />,
//     title: "Urgent Booking Attention",
//     details: "Special requirements confirmation needed",
//     ref: "INQ–2024–0841",
//     priority: "Medium",
//     bg: "#F4FBF6",
//   },
// ];

const ActivityTimeLine: React.FC = () => {
  const theme = useTheme();
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
        <Button className="btn" variant="text" size="small">All Activities</Button>
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

    //   <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
    //     <Card variant="outlined" sx={{ borderRadius: 3 }}>
    //       <CardContent>
    //         <Stack direction="row" justifyContent="space-between" alignItems="center">
    //           <Typography variant="h6" color="error" fontWeight={700}>
    //             Priority Tasks
    //           </Typography>
    //           <Chip
    //             label="2 High Priority"
    //             color="error"
    //             size="small"
    //             sx={{ fontWeight: 600 }}
    //           />
    //         </Stack>

    //         <Box sx={{ mt: 2 }}>
    //           {tasks.map((task) => (
    //             <Box
    //               key={task.id}
    //               sx={{
    //                 display: "flex",
    //                 alignItems: "flex-start",
    //                 justifyContent: "space-between",
    //                 p: 2,
    //                 mb: 1.5,
    //                 bgcolor: task.bg,
    //                 borderRadius: 2,
    //               }}
    //             >
    //               <Box sx={{ display: "flex", alignItems: "flex-start" }}>
    //                 <Box sx={{ mr: 2, mt: 0.5 }}>{task.icon}</Box>
    //                 <Box>
    //                   <Typography variant="subtitle1" fontWeight={600}>
    //                     {task.title}
    //                   </Typography>
    //                   <Typography variant="body2" sx={{ mt: 0.5 }}>
    //                     {task.details}
    //                   </Typography>
    //                   <Typography variant="caption" color="text.secondary">
    //                     {task.ref}
    //                   </Typography>
    //                 </Box>
    //               </Box>

    //               <Stack alignItems="flex-end">
    //                 <Chip
    //                   label={task.priority}
    //                   color={
    //                     task.priority === "High"
    //                       ? "error"
    //                       : task.priority === "Medium"
    //                       ? "warning"
    //                       : "default"
    //                   }
    //                   size="small"
    //                   sx={{ borderRadius: "16px", fontWeight: 600 }}
    //                 />
    //                 <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
    //                   Take Action
    //                 </Typography>
    //               </Stack>
    //             </Box>
    //           ))}
    //         </Box>

    //         <Button
    //           fullWidth
    //           sx={{
    //             bgcolor: "#0A0A60",
    //             color: "#fff",
    //             borderRadius: 2,
    //             mt: 2,
    //             py: 1.2,
    //             "&:hover": { bgcolor: "#00005a" },
    //           }}
    //         >
    //           View All Tasks
    //         </Button>
    //       </CardContent>
    //     </Card>
    //   </Grid>
  );
};

export default ActivityTimeLine;
