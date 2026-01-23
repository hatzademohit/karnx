import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    Button,
    Stack,
    useTheme,
    IconButton,
} from "@mui/material";
import { apiBaseUrl } from "@/karnx/api";
import CustomModal from "../CustomModal";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
type Priority = {
    id: string | number;
    title: string;
    time: string;
    details: string;
    subtitle?: string;
    inquiryId?: string;
};

type PriorityTaskProps = {
    onPriorityClick?: (activity: Priority) => void;
};

const PriorityTasks: React.FC<PriorityTaskProps> = ({ onPriorityClick }) => {
    const theme = useTheme();
    const [tasks, setTaskData] = useState([]);
    const [openTasks, setOpenTasks] = useState(false);
    const [taskList, setTaskList] = useState<any>([]);
    const [totalPendingTask, setTotalPendingTask] = useState<any>([]);

    const fetchTasks = async () => {
        try {
            const url = `${apiBaseUrl}/dashboard/kxmanager-prioritytask`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                    Accept: 'application/json, text/html',
                }
            });
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            const result = await response.json();
            setTaskData(result.data);
            setTotalPendingTask(result.total_task);
        } catch (err: any) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTaskList = (task) => {
        setOpenTasks(true)
        setTaskList(task)
    }

    return (
        <>
            <Box className='card'>
                <Box className='card-header'>
                    <Typography component='h4' variant="h4" sx={{ color: theme?.common?.redColor }}>Priority Tasks</Typography>
                </Box>

                {Array.isArray(tasks) && tasks?.length > 0 ? (
                    <>
                        <Box className="card-body" sx={{ maxHeight: '260px', overflowY: 'auto' }}>
                            {tasks?.map((task) => (
                                <Box
                                    key={task.id}
                                    onClick={() => fetchTaskList(task)}
                                    sx={{
                                        display: "flex",
                                        cursor: 'pointer',
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        p: { md: 2, xs: '8px' },
                                        mb: 1.5,
                                        bgcolor: task.bg,
                                        borderRadius: 2,
                                        border: `2px solid ${task?.border_color}`,
                                        transition: 'background-color 300ms ease',
                                        '&:hover': { backgroundColor: task?.hover_bg }
                                    }}
                                >
                                    <Box sx={{ width: '100%', display: "flex", alignItems: "flex-start", gap: 2, justifyContent: 'space-between' }}>
                                        {/* left section */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Box sx={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: task?.border_color, color: task?.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {task?.icon === 'warning' ? <WarningAmberIcon sx={{ color: 'inherit' }} /> : <InfoOutlineIcon sx={{ color: 'inherit' }} />}
                                            </Box>
                                            <Box>
                                                <Typography variant="h5" sx={{ color: task?.color }}>
                                                    {task?.title}
                                                </Typography>
                                                <Typography variant="body2" className="fs12">
                                                    {task?.tasks_details?.length} task pending
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {/* right section */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Chip
                                                label={task?.tasks_details?.length}
                                                color={task?.color}
                                                sx={{ borderRadius: "10px", backgroundColor: task?.color, color: '#ffffff', fontSize: '16px' }}
                                            />
                                            <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', p: { md: 2, xs: '8px' }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2, mt: '12px' }}>
                            <Typography className="fs14">Total Pending Tasks</Typography>
                            <Typography variant="h5" component='h5'>{totalPendingTask?.total_pending_task}</Typography>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, p: 3, backgroundColor: '#f9fafb', border: `2px dashed ${theme?.common?.borderColor}`, textAlign: 'center' }}>There is no pending tasks</Typography>
                )}
            </Box>

            {/* modal for priority tasks */}
            <CustomModal
                open={openTasks} setOpen={setOpenTasks}
                dataAction={() => setOpenTasks(false)} dataClose={() => setOpenTasks(false)}
                className="priority_modal"
                headerText={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: taskList?.border_color, color: taskList?.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <DescriptionOutlinedIcon />
                        </Box>
                        <Box>
                            <Typography variant="h3" component='h3'>{taskList?.title + ' Tasks'}</Typography>
                            <Typography variant="body2" className="fs14" sx={{ color: 'inherit' }}>
                                {taskList?.tasks_details?.length} tasks requiring attention
                            </Typography>
                        </Box>
                    </Box>
                }
                sx={{
                    '& .modal-header': {
                        backgroundColor: taskList?.color, color: '#ffffff',
                        '& .MuiIconButton-root': { color: '#ffffff', '&:hover': { backgroundColor: taskList?.border_color } }
                    },
                }}
            >
                {taskList?.tasks_details && taskList?.tasks_details.map((taskDetails, index) => (
                    <Box key={index}
                        sx={{ p: 1, backgroundColor: taskList?.bg, border: `2px solid ${taskList?.border_color}`, borderRadius: 2, mb: 2, gap: 1, display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px' } }}
                    >
                        <Box sx={{ alignItems: 'center', gap: 1, display: 'flex' }}>
                            <Chip label={taskDetails?.type} size="small"
                                sx={{ borderRadius: "4px", backgroundColor: taskList?.color, color: '#ffffff' }}
                            />
                            <Typography variant="body2" className="fs12" sx={{ color: 'inherit' }}>
                                Task #{index + 1}
                            </Typography>
                        </Box>
                        <Typography variant="h5" component='h5'>{taskDetails?.task_name}</Typography>
                        <Typography variant="body2" className="fs14">{taskDetails?.description}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <MeetingRoomOutlinedIcon sx={{ color: '#4D4D4D', fontSize: '18px' }} />
                                <Box>
                                    <Typography variant="body2" className="fs12">Client</Typography>
                                    <Typography variant="h6" component='h6'>{taskDetails?.client}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <InfoOutlineIcon sx={{ color: '#4D4D4D', fontSize: '18px' }} />
                                <Box>
                                    <Typography variant="body2" className="fs12">Inquiry Number</Typography>
                                    <Typography variant="h6" component='h6'>{taskDetails?.inquiry_number}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <WatchLaterOutlinedIcon sx={{ color: '#4D4D4D', fontSize: '18px' }} />
                                <Box>
                                    <Typography variant="body2" className="fs12">Time Overdue</Typography>
                                    <Typography variant="h6" component='h6'>{taskDetails?.time_overdue}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Button className="btn w-100" variant="contained" size="large"
                            sx={{ mt: 2, borderColor: `${taskList?.color} !important`, backgroundColor: `${taskList?.color} !important`, mb: 1 }} onClick={() => onPriorityClick?.(taskDetails)}>
                            Take Action
                        </Button>
                    </Box>
                ))}

                <Box className='modal-footer'>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Typography variant="body2">Showing {taskList?.tasks_details?.length} tasks</Typography>
                        <Button variant="text" size="large" sx={{ color: '#000000' }} onClick={() => setOpenTasks(false)}>Close</Button>
                    </Box>
                </Box>
            </CustomModal>
        </>
    );
};

export default PriorityTasks;
