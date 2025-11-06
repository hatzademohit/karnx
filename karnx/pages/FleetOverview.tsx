'use client'
import { useAuth } from "@/app/context/AuthContext";
import MUIDataGrid from "@/components/TableComp/MUIDataGrid";
import {
  Box,
  Button,
  DialogActions,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiBaseUrl } from "../api";
import { toast } from "react-toastify";
import { CustomModal, CustomTextField, SingleSelect, CardDataGrid } from "@/components";

const MAX_IMAGES = 5;
type Status = string;

interface FleetClient {
  id: number;
  name: string;
}

interface FleetRow {
  id: number;
  client_id: number;
  client?: FleetClient;
  asset_name: string;
  asset_type: string;
  aircraft_model: string;
  aircraft_type: string;
  registration_no: string;
  capacity: number;
  cabin_size: string;
  imageUrls?: string[];
  status: Status;
  details?: string;
}

type FormState = {
  id?: number;
  client_id: number;
  asset_name: string;
  asset_type: string;
  aircraft_model: string;
  aircraft_type: string;
  registration_no: string;
  capacity: number;
  cabin_size: string;
  imageUrls: string[];
  imageFiles: File[];
  status: Status;
  details: string;
};

const FleetOverview = () => {
  const { theme, hasPermission } = useAuth();

  // Listing state
  const [fleetRows, setFleetRows] = useState<FleetRow[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Form/dialog state
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<FleetClient[]>([]);
  const [form, setForm] = useState<FormState>({
    client_id: 0,
    asset_name: "",
    asset_type: "",
    aircraft_model: "",
    aircraft_type: "",
    registration_no: "",
    capacity: 0,
    cabin_size: "",
    imageUrls: [],
    imageFiles: [],
    status: "Active",
    details: "",
  });

  // View dialog
  const [openView, setOpenView] = useState(false);
  const [viewRow, setViewRow] = useState<FleetRow | null>(null);

  // Image preview tracking
  const blobUrlsRef = useRef<Set<string>>(new Set());
  const fileByPreviewRef = useRef<Map<string, File>>(new Map());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Build host base for relative image URLs
  const apiHost = useMemo(() => {
    if (!apiBaseUrl) return "";
    return apiBaseUrl.replace(/\/api\/?$/, "");
  }, []);

  const toFullUrl = useCallback(
    (p: string) => {
      if (!p) return "";
      if (/^https?:\/\//i.test(p)) return p;
      const cleaned = p.replace(/^\/+/, "");
      return `${apiHost}/${cleaned}`;
    },
    [apiHost]
  );

  const parseImages = useCallback(
    (val: unknown): string[] => {
      if (!val) return [];
      if (Array.isArray(val)) return val.map((x) => toFullUrl(String(x)));
      if (typeof val === "string") {
        const s = val.trim();
        if (!s) return [];
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) {
            return parsed.map((x: any) => toFullUrl(String(x)));
          }
          return [];
        } catch {
          return [toFullUrl(s)];
        }
      }
      return [];
    },
    [toFullUrl]
  );

  // Fetch clients for dropdown
  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/clients`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
      });
      if (!res.ok) throw new Error(`Clients fetch failed (${res.status})`);
      const data = await res.json();
      const list = (data?.data?.data ?? data?.data ?? []) as any[];
      const mapped = list
        .map((c) => ({
          id: Number(c.id),
          name: String(c.name ?? c.client_name ?? c.title ?? ""),
        }))
        .filter((c) => c.name);
      setClients(mapped);
    } catch (e: any) {
      console.warn("Failed to fetch clients", e);
      setClients([]);
    }
  }, []);

  // Fetch assets (server-side)
  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.set("page", String(page + 1)); // API 1-based
      params.set("per_page", String(pageSize));

      if (sortModel.length > 0) {
        const s = sortModel[0];
        if (s.field) params.set("sort_by", s.field);
        if (s.sort) params.set("sort_dir", s.sort);
      }

      const endpoint = `${apiBaseUrl}/assets?${params.toString()}`;
      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Request failed (${res.status})`);
      }

      const json = await res.json();
      const list = (json?.data?.data ?? []) as any[];
      const total = Number(json?.data?.total ?? 0);

      const rows: FleetRow[] = list.map((item) => {
        const imagesField = item.images;
        const imageUrls = parseImages(imagesField);
        const row: FleetRow = {
          id: Number(item.id),
          client_id: Number(item.client_id),
          client: item.client ? { id: Number(item.client.id), name: String(item.client.name) } : undefined,
          asset_name: String(item.asset_name ?? ""),
          asset_type: String(item.asset_type ?? ""),
          aircraft_model: String(item.aircraft_model ?? ""),
          aircraft_type: String(item.aircraft_type ?? ""),
          registration_no: String(item.registration_no ?? ""),
          capacity: Number(item.capacity ?? 0),
          cabin_size: String(item.cabin_size ?? ""),
          imageUrls,
          status: String(item.status ?? ""),
          details: item.details ? String(item.details) : "",
        };
        return row;
      });

      setFleetRows(rows);
      setRowCount(total);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch assets");
      setFleetRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortModel, parseImages]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      blobUrlsRef.current.clear();
      fileByPreviewRef.current.clear();
    };
  }, []);

  const resetForm = () => {
    (form.imageUrls || []).forEach((u) => {
      if (u.startsWith("blob:") && blobUrlsRef.current.has(u)) {
        URL.revokeObjectURL(u);
        blobUrlsRef.current.delete(u);
      }
    });
    fileByPreviewRef.current.clear();
    setForm({
      client_id: 0,
      asset_name: "",
      asset_type: "",
      aircraft_model: "",
      aircraft_type: "",
      registration_no: "",
      capacity: 0,
      cabin_size: "",
      imageUrls: [],
      imageFiles: [],
      status: "Active",
      details: "",
    });
    setIsEdit(false);
  };

  const handleOpenAdd = async () => {
    resetForm();
    setIsEdit(false);
    setOpenForm(true);
    await fetchClients();
  };

  const handleEdit = async (row: FleetRow) => {
    resetForm();
    setForm({
      id: row.id,
      client_id: row.client_id,
      asset_name: row.asset_name,
      asset_type: row.asset_type,
      aircraft_model: row.aircraft_model,
      aircraft_type: row.aircraft_type,
      registration_no: row.registration_no,
      capacity: row.capacity,
      cabin_size: row.cabin_size,
      imageUrls: row.imageUrls ? [...row.imageUrls] : [],
      imageFiles: [],
      status: row.status,
      details: row.details || "",
    });
    setIsEdit(true);
    setOpenForm(true);
    await fetchClients();
  };

  const handleView = (row: FleetRow) => {
    setViewRow(row);
    setOpenView(true);
  };

  const handleDelete = async (row: FleetRow) => {
    const ok = window.confirm(`Delete asset "${row.asset_name}" (ID: ${row.id})?`);
    if (!ok) return;
    try {
      const res = await fetch(`${apiBaseUrl}/assets/${row.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Delete failed");
      }
      toast.success("Deleted");
      fetchAssets();
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete");
    }
  };

  const handleFormChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remaining = MAX_IMAGES - (form.imageUrls?.length || 0);
    if (remaining <= 0) return;

    const accepted = files.slice(0, remaining);

    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    for (const f of accepted) {
      const u = URL.createObjectURL(f);
      blobUrlsRef.current.add(u);
      fileByPreviewRef.current.set(u, f);
      newPreviews.push(u);
      newFiles.push(f);
    }

    handleFormChange("imageUrls", [...(form.imageUrls || []), ...newPreviews]);
    handleFormChange("imageFiles", [...(form.imageFiles || []), ...newFiles]);

    if (fileInputRef.current) fileInputRef.current.value = "";
    e.target.value = "";
  };

  const removeImageAt = (index: number) => {
    const urls = [...(form.imageUrls || [])];
    const url = urls[index];

    urls.splice(index, 1);
    handleFormChange("imageUrls", urls);

    if (url && fileByPreviewRef.current.has(url)) {
      const file = fileByPreviewRef.current.get(url)!;
      handleFormChange(
        "imageFiles",
        (form.imageFiles || []).filter((f) => f !== file)
      );
      fileByPreviewRef.current.delete(url);
    }

    if (url && url.startsWith("blob:") && blobUrlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      blobUrlsRef.current.delete(url);
    }
  };

  const handleSave = async () => {
    try {
      // Basic validation
      if (!form.client_id || form.client_id === 0) {
        toast.error("Please select a client");
        return;
      }
      if (!form.asset_name.trim()) {
        toast.error("Please enter Asset Name");
        return;
      }

      setSaving(true);

      const fd = new FormData();
      fd.append("client_id", String(form.client_id));
      fd.append("asset_name", form.asset_name);
      fd.append("asset_type", form.asset_type);
      fd.append("aircraft_model", form.aircraft_model);
      fd.append("aircraft_type", form.aircraft_type);
      fd.append("registration_no", form.registration_no);
      fd.append("capacity", String(form.capacity || 0));
      fd.append("cabin_size", form.cabin_size);
      fd.append("status", form.status);
      fd.append("details", form.details || "");

      // Attach new files
      (form.imageFiles || []).forEach((file) => {
        fd.append("images[]", file);
      });

      const isUpdating = Boolean(form.id);
      const url = isUpdating ? `${apiBaseUrl}/assets/${form.id}` : `${apiBaseUrl}/assets`;
      const method = isUpdating ? "PUT" : "POST"; // change if your API expects POST for both

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Save failed");
      }

      toast.success(isUpdating ? "Fleet updated" : "Fleet created");
      setOpenForm(false);
      resetForm();
      fetchAssets();
    } catch (e: any) {
      toast.error(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Columns
  // const columns: GridColDef[] = useMemo(
  //   () => [
  //     {
  //       field: "imageUrls",
  //       headerName: "Image",
  //       width: 110,
  //       sortable: false,
  //       filterable: false,
  //       renderCell: (params) => {
  //         const first = (params.row.imageUrls && params.row.imageUrls[0]) || "";
  //         return (
  //           <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
  //             <Avatar
  //               variant="rounded"
  //               src={first}
  //               alt={params.row.asset_name}
  //               sx={{ width: 90, height: 56, borderRadius: 1 }}
  //             />
  //           </Box>
  //         );
  //       },
  //     },
  //     {
  //       field: "client_id",
  //       headerName: "Client",
  //       width: 180,
  //       valueGetter: (params) => {
  //         const row = params?.row as any;
  //         return row?.client?.name ?? row?.client_id ?? "";
  //       },
  //     },
  //     { field: "asset_name", headerName: "Asset Name", flex: 1, minWidth: 180 },
  //     { field: "registration_no", headerName: "Registration No", minWidth: 160 },
  //     { field: "aircraft_model", headerName: "Aircraft Model", minWidth: 160 },
  //     { field: "aircraft_type", headerName: "Aircraft Type", minWidth: 140 },
  //     { field: "capacity", headerName: "Capacity", minWidth: 110, type: "number" },
  //     { field: "cabin_size", headerName: "Cabin Size", minWidth: 140 },
  //     { field: "status", headerName: "Status", minWidth: 120 },
  //     {
  //       field: "actions",
  //       headerName: "Actions",
  //       width: 120,
  //       sortable: false,
  //       filterable: false,
  //       renderCell: (params) => (
  //         <Stack direction="row" spacing={1} alignItems="center" height='100%'>
  //           <Tooltip title="View" arrow>
  //             <IconButton size="small" onClick={() => handleView(params.row)}>
  //               <VisibilityIcon fontSize="small" />
  //             </IconButton>
  //           </Tooltip>
  //           <Tooltip title="Edit" arrow>
  //             <IconButton size="small" onClick={() => handleEdit(params.row)}>
  //               <EditIcon fontSize="small" />
  //             </IconButton>
  //           </Tooltip>
  //           {/*<Tooltip title="Delete" arrow>
  //             <IconButton size="small" color="error" onClick={() => handleDelete(params.row)}>
  //               <DeleteIcon fontSize="small" />
  //             </IconButton>
  //           </Tooltip>*/}
  //         </Stack>
  //       ),
  //     },
  //   ],
  //   []
  // );

  // Show-entries select
  /*const pageSizeSelector = (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel id="show-entries-label">Show entries</InputLabel>
      <SingleSelect
        labelId="show-entries-label"
        id="show-entries"
        label="Show entries"
        value={pageSize === Number.MAX_SAFE_INTEGER ? "all" : pageSize}
        onChange={(e) => {
          const val = e.target.value as number | "all";
          const nextSize = val === "all" ? Number.MAX_SAFE_INTEGER : Number(val);
          setPage(0);
          setPageSize(nextSize);
        }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
        <MenuItem value={"all"}>All</MenuItem>
      </SingleSelect>
    </FormControl>
  );*/

  return (
    <>
      <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography component="h2" variant="h2" sx={{ color: theme?.heading?.color, mb: 2 }}>
          Fleet Master
        </Typography>

        {/* <MUIDataGrid
          gridColumns={columns}
          gridRows={fleetRows}
          // Toolbar
          buttonText="Add Fleet"
          onClick={handleOpenAdd}
          exportButtton={false}
          fileName="fleet"
          fileHeading="Fleet"
          rowHeight={64}
          //selectFilter={pageSizeSelector}
          // Server-side controls
          paginationMode="server"
          sortingMode="server"
          rowCount={rowCount}
          page={page}
          pageSize={pageSize === Number.MAX_SAFE_INTEGER ? rowCount || 1000000 : pageSize}
          onPageSizeChange={(model: { page: number; pageSize: number }) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          onSortModelChange={(model: GridSortModel) => {
            setSortModel(model);
            setPage(0);
          }}
        /> */}

        <CardDataGrid
          buttonText={hasPermission && hasPermission(['fleet create']) ? 'Add Fleet' : undefined}
          onClick={hasPermission && hasPermission(['fleet create']) ? handleOpenAdd : undefined}
          editClick={handleEdit}
          viewClick={handleView}
          data={fleetRows}
        />
      </Box>

      {/* Add/Edit Dialog */}
      <CustomModal open={openForm} setOpen={setOpenForm} dataClose={() => setOpenForm(false)} headerText={isEdit ? "Edit Fleet" : "Add Fleet"} className="modal-lg">
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
            {/* Each item takes 6 out of 12 columns = 2 per row */}
            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <SingleSelect
                inputLabel="Client"
                value={form.client_id || 0}
                onChange={(e) => handleFormChange("client_id", Number(e.target.value))}
                size='small'
              >
                {clients.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </SingleSelect>
            </Grid>

            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <CustomTextField
                inputLabel="Asset Name"
                value={form.asset_name}
                onChange={(e) => handleFormChange("asset_name", e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <CustomTextField
                inputLabel="Asset Type"
                value={form.asset_type}
                onChange={(e) => handleFormChange("asset_type", e.target.value)}
                size="small"
              />
            </Grid>

            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <CustomTextField
                inputLabel="Aircraft Model"
                value={form.aircraft_model}
                onChange={(e) => handleFormChange("aircraft_model", e.target.value)}
                size="small"
              />
            </Grid>

            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <CustomTextField
                inputLabel="Aircraft Type"
                value={form.aircraft_type}
                onChange={(e) => handleFormChange("aircraft_type", e.target.value)}
                size="small"
              />
            </Grid>

            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <CustomTextField
                inputLabel="Registration No"
                value={form.registration_no}
                onChange={(e) => handleFormChange("registration_no", e.target.value)}
                size="small"
              />
            </Grid>

            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <CustomTextField
                inputLabel="Capacity"
                type="number"
                value={form.capacity}
                onChange={(e) => handleFormChange("capacity", Number(e.target.value) || 0)}
                size="small"
              />
            </Grid>

            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <CustomTextField
                inputLabel="Cabin Size"
                value={form.cabin_size}
                onChange={(e) => handleFormChange("cabin_size", e.target.value)}
                size="small"
              />
            </Grid>

            <Grid size={{ lg: 4, md: 6, sm: 12 }}>
              <SingleSelect
                inputLabel="Status"
                value={form.status}
                onChange={(e) => handleFormChange("status", e.target.value as Status)}
                size='small'
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Maintenance">Maintenance</MenuItem>
              </SingleSelect>
            </Grid>

            {/* Full-width Details */}
            <Grid size={{ lg: 12, md: 12, sm: 12 }}>
              <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333' }}>Details</InputLabel>
              <FormControl fullWidth>
                <TextField
                  value={form.details}
                  onChange={(e) => handleFormChange("details", e.target.value)}
                  size="small"
                  multiline
                  minRows={3}
                />
              </FormControl>
            </Grid>
          </Grid>

          {/* Image upload section */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<AddPhotoAlternateOutlinedIcon />}
              onClick={() => fileInputRef.current?.click()}
            >
              Select Images
            </Button>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {form.imageUrls?.length || 0}/{MAX_IMAGES} selected
            </Typography>
          </Stack>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFilesSelected}
          />

          <Grid container spacing={1}>
            {(form.imageUrls || []).map((u, idx) => (
              <Grid size={{ lg: 4, md: 6, sm: 12 }} key={`${u}-${idx}`}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid #E6E6E6",
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f8f8f8",
                  }}
                >
                  <img
                    src={u}
                    alt={`fleet-${idx}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeImageAt(idx)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                    }}
                    aria-label="Remove image"
                  >
                    <CloseRoundedIcon sx={{ fontSize: 'inherit' }} />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <DialogActions className="modal-footer" sx={{ mt: 2 }}>
          <Button onClick={() => setOpenForm(false)} disabled={saving}>
            Cancel
          </Button>
          <Button variant="contained" className="btn btn-blue" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </CustomModal>

      <CustomModal open={openView} setOpen={setOpenView} dataClose={() => setOpenView(false)} headerText={`Fleet Details`} className="modal-lg">
        {viewRow && (
          <Stack spacing={2}>
            <Grid container spacing={1}>
              {(viewRow.imageUrls || []).map((u, idx) => (
                <Grid size={{ lg: 4, md: 6, sm: 12 }} key={`${u}-${idx}`}>
                  <Box
                    sx={{
                      borderRadius: 1,
                      overflow: "hidden",
                      border: "1px solid #E6E6E6",
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f8f8f8",
                    }}
                  >
                    <img
                      src={u}
                      alt={`fleet-view-${idx}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2}>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField
                  inputLabel="Client"
                  value={viewRow.client?.name ?? viewRow.client_id}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField inputLabel="Asset Name" value={viewRow.asset_name} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField inputLabel="Asset Type" value={viewRow.asset_type} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField
                  inputLabel="Aircraft Model"
                  value={viewRow.aircraft_model}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField
                  inputLabel="Aircraft Type"
                  value={viewRow.aircraft_type}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField
                  inputLabel="Registration No"
                  value={viewRow.registration_no}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField inputLabel="Capacity" value={viewRow.capacity} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField inputLabel="Cabin Size" value={viewRow.cabin_size} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid size={{ lg: 4, md: 6, sm: 12 }}>
                <CustomTextField inputLabel="Status" value={viewRow.status} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid size={{ lg: 12, md: 12, sm: 12 }}>
                <InputLabel sx={{ fontFamily: 'poppins-semibold', width: 'fit-content', color: '#333333' }}>Details</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    value={viewRow.details || ""}
                    size="small"
                    multiline
                    minRows={3}
                    InputProps={{ readOnly: true }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        )}
        <DialogActions className="modal-footer" sx={{ mt: 2 }}>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </CustomModal>
    </>
  );
};

export default FleetOverview;