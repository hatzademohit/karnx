import React, { useState, useMemo } from "react";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Grid,
  Pagination,
  Chip,
  Button,
  IconButton
} from "@mui/material";
// import { CardDataGrid } from "..";
import { useAuth } from "@/app/context/AuthContext";

interface FleetClient {
  id: number;
  name: string;
}
interface FleetCardGridProps {
  data: any[];
  buttonText?: string;
  onClick?: () => void;
  editClick?: (e: any) => void;
  viewClick?: (e: any) => void;
}

const CardDataGrid: React.FC<FleetCardGridProps> = ({ data, buttonText, onClick, editClick, viewClick }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // 4 per row × 2 rows
  const { hasPermission } = useAuth();

  const filteredData = useMemo(() => {
  const term = search.toLowerCase();
  if (!term) return data;

  return data.filter((item) => {
    // Convert entire item (including nested fields) to a string
    const itemString = JSON.stringify(item).toLowerCase();
    return itemString.includes(term);
  });
}, [search, data]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [page, filteredData]);

  const handlePageChange = (_: any, value: number) => setPage(value);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
        {buttonText && <Button variant="outlined" className="btn btn-blue" disableElevation onClick={onClick}>{buttonText}</Button>}
        {/* Search box */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          fullWidth
          sx={{ maxWidth: '250px', ml: 'auto' }}
          className='input-search'
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />,
              endAdornment: <IconButton size="small" onClick={() => setSearch('')}><CloseIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} /></IconButton>,
            },
          }}
        />
      </Box>

      {/* Grid of cards */}
      <Grid container spacing={2}>
        {paginatedData.map((item) => (
          <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                boxShadow: 'unset',
                border: '1px solid rgb(230, 230, 230)',
                "&:hover": { boxShadow: 4 },
              }}
            >
              {item.imageUrls?.length > 0 ? (
                <CardMedia
                  component="img"
                  height="160"
                  image={item.imageUrls}
                  alt={item.asset_name}
                  sx={{ objectFit: "cover" }}
                />
              ) : (
                <Box
                  sx={{
                    height: 160,
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                  }}
                >
                  No Image
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1, paddingBottom: '16px !important' }}>
                <Box sx={{ display: 'flex', gap: '12px', flexDirection: 'column', '& h6': { marginBottom: '0px' } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Assets Name:</Typography>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.asset_name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Status:</Typography>
                    <Chip
                      label={item.status}
                      color={
                        item.status.toLowerCase() === "active"
                          ? "success"
                          : "default"
                      }
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Client:</Typography>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.client?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Registration No:</Typography>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.registration_no}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Aircraft Model:</Typography>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.aircraft_model}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Aircraft Type:</Typography>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.asset_type}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Capacity:</Typography>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.capacity}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography sx={{ color: 'rgb(77, 77, 77)', fontSize: 14 }}>Cabin Size:</Typography>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.cabin_size}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '10px', 'button.btn': { width: '100%' } }}>
                    <Button size="small" className="btn btn-blue" onClick={() => viewClick(item)}>
                      View Details
                    </Button>
                    <Button
                      size="small"
                      className="btn btn-outlined"
                      onClick={hasPermission && hasPermission(['fleet edit']) ? () => editClick && editClick(item) : undefined}
                      style={hasPermission && hasPermission(['fleet edit']) ? undefined : { display: 'none' }}
                    >
                      Edit Details
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {paginatedData.length === 0 && (
          <Box sx={{ textAlign: "center", width: "100%", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No matching results found.
            </Typography>
          </Box>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default CardDataGrid;
