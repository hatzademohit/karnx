import React, { useState } from "react";
import { Box, Typography, Button, useTheme, Grid } from "@mui/material";
import { Warning, Flight, AttachMoney } from "@mui/icons-material";
import { SingleSelectRadio } from "@/components";

const activities = [
  {
    id: 1,
    icon: <Flight color="primary" />,
    title: "New inquiry received",
    time: "2 minutes ago",
    details: "DEL → BOM, October 25, 2025 • 4 passengers",
    subtitle: "Harrison Industries",
  },
  {
    id: 2,
    icon: <Warning color="error" />,
    title: "Urgent: Quote expiring soon",
    time: "32 minutes ago",
    details: "Client decision needed within 2 hours",
    subtitle: "Meridian Holdings",
  },
  {
    id: 3,
    icon: <AttachMoney color="success" />,
    title: "Quote received from operator",
    time: "15 minutes ago",
    details: "Elite Aviation responded to INQ–2024–0847",
    subtitle: "Sterling Corp",
  },
];

const options = ['All Activities', 'Inquiries', 'Quotes', 'Bookings']

const ActivityTimeLine: React.FC = () => {
const theme  = useTheme();
const [selectedActivity, setSelectedActivity] = useState('All Activities')

  return (
	<Box className='card'>
		<Box className='card-header'>
			<Typography component='h3' variant="h3" sx={{color: theme?.common?.redColor}}>Activity Timeline</Typography>
			<SingleSelectRadio
				size="small"
				variant="filled"
				options={options}
				value={selectedActivity}
				onChange={(value) => setSelectedActivity(value)}
				className="select_filter"
				menuClassName="custom-select-dropdown"
			/>
		</Box>

		<Box  className="card-body" sx={{ maxHeight: '260px' , overflowY: 'auto' }}>
			{activities.map((item, idx) => (
				<Box
				key={item.id}
				sx={{
					display: "flex",
					alignItems: "flex-start",
					p: { md: 2, xs: '8px' },
					bgcolor: idx % 2 === 1 ? "#F7F7F9" : "#F9FAFB",
					borderRadius: 2,
					mb: 1.5,
				}}
				>
					<Grid container spacing={2} sx={{ width: '100%' }}>
						<Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<Box sx={{ display: 'flex', gap: 1.5 }}>
								<Box sx={{ mt: 0.5 }}>{item.icon}</Box>
								<Box>
									<Typography variant="h5" component='h5'>
										{item.title}
									</Typography>
									<Typography variant="caption" color="text.secondary">
										{item.time}
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<Typography variant="body2">
								{item.details}
							</Typography>
							<Typography variant="body2" color="error" fontWeight={500}>
								{item.subtitle}
							</Typography>
						</Grid>
					</Grid>
				</Box>
			))}
		</Box>

		<Button className="btn btn-blue" sx={{maxWidth: '100%', width: '100%', mt: 2}}> View All Activities </Button>
	</Box>
  );
};

export default ActivityTimeLine;
