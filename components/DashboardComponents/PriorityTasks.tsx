import React from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { AccessTime, Warning, Notifications } from "@mui/icons-material";

const tasks = [
  {
    id: 1,
    icon: <Warning color="error" />,
    title: "Overdue Operator Response",
    details: "Premium Jets – 6 hours overdue",
    ref: "INQ–2024–0842",
    priority: "High",
    bg: "#F4FBF6",
  },
  {
    id: 2,
    icon: <AccessTime color="warning" />,
    title: "Quote Expiring Soon",
    details: "Client decision needed in 1.5 hours",
    ref: "INQ–2024–0839",
    priority: "High",
    bg: "#F7F7F9",
  },
  {
    id: 3,
    icon: <Notifications color="primary" />,
    title: "Urgent Booking Attention",
    details: "Special requirements confirmation needed",
    ref: "INQ–2024–0841",
    priority: "Medium",
    bg: "#F4FBF6",
  },
];

const PriorityTasks: React.FC = () => {
const theme  = useTheme();
  return (
        <Box className='card'>
            <Box className='card-header'>
                <Typography component='h3' variant="h3" sx={{color: theme?.common?.redColor}}>Priority Tasks</Typography>
                <Chip
                    label="2 High Priority"
                    color="error"
                    size="small"
                />    
            </Box>

            <Box  className="card-body" sx={{ maxHeight: '260px' , overflowY: 'auto' }}>
                {tasks.map((task) => (
                    <Box
                        key={task.id}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            p: 2,
                            mb: 1.5,
                            bgcolor: task.bg,
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                            <Box sx={{ mr: 2, mt: 0.5 }}>{task.icon}</Box>
                            <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {task.title}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {task.details}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {task.ref}
                            </Typography>
                            </Box>
                        </Box>

                        <Stack alignItems="flex-end">
                            <Chip
                                label={task.priority}
                                color={
                                    task.priority === "High"
                                    ? "error"
                                    : task.priority === "Medium"
                                    ? "warning"
                                    : "default"
                                }
                                size="small"
                                sx={{ borderRadius: "16px" }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                Take Action
                            </Typography>
                        </Stack>
                    </Box>
                ))}
            </Box>

            <Button className="btn btn-blue" sx={{maxWidth: '100%', width: '100%', mt: 2}}> View All Tasks </Button>
        </Box>
  );
};

export default PriorityTasks;
