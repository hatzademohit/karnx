import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    Button,
    Stack,
    useTheme,
} from "@mui/material";
import { AccessTime, Warning, Notifications } from "@mui/icons-material";
import { apiBaseUrl } from "@/karnx/api";

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

const PriorityTasks: React.FC = () => {
    const theme = useTheme();
    const [tasks, setTaskData] = useState([]);
    const [highPriorityTasks, setHighPriorityTasks] = useState('');

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
            setHighPriorityTasks(result.priorityCount);
        } catch (err: any) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <Box className='card'>
            <Box className='card-header'>
                <Typography component='h3' variant="h3" sx={{ color: theme?.common?.redColor }}>Priority Tasks</Typography>
                <Chip
                    label={highPriorityTasks}
                    color="error"
                    size="small"
                />
            </Box>

            <Box className="card-body" sx={{ maxHeight: '260px', overflowY: 'auto' }}>
                {tasks.map((task) => (
                    <Box
                        key={task.id}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            p: { md: 2, xs: '8px' },
                            mb: 1.5,
                            bgcolor: task.bg,
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                            <Box sx={{ mr: 2, mt: 0.5 }}>{task.icon}</Box>
                            <Box>
                                <Typography variant="h5" fontWeight={600}>
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

            <Button className="btn btn-blue" sx={{ maxWidth: '100%', width: '100%', mt: 2 }}> View All Tasks </Button>
        </Box>
    );
};

export default PriorityTasks;
