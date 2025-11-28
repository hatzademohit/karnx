"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Tabs,
  Tab,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { apiBaseUrl } from "@/karnx/api";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import { SingleSelect } from "@/components";

// ------------------
// Types (relaxed to tolerate API variations)
// ------------------
interface PermissionTypeFromModule {
  id?: string | number; // permission id (if provided)
  name: string; // e.g. "create", "read", ...
}

interface ModuleItem {
  id: string | number;
  slug: string;
  permissions: Array<PermissionTypeFromModule | string>; // some APIs return string[]
}

// What the UI consumes
interface NormalizedRow {
  module_id: string | number;
  permissions: Record<string, boolean>; // { create: true, read: false, ... }
}

// Some backends send arrays of ids, some send named objects, some send rows with an object
// like {module_id, permissions: {create: true, ...}}
// Keep raw flexible
type RawPermissionRow = any;

const RoleUserPermission: React.FC = () => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [roles, setRoles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | number>("");
  const [selectedUser, setSelectedUser] = useState<string | number>("");

  const [allModules, setAllModules] = useState<ModuleItem[]>([]);

  // We store raw from API and then always normalize against current modules
  const [rawPermissions, setRawPermissions] = useState<RawPermissionRow[]>([]);
  const [permissions, setPermissions] = useState<NormalizedRow[]>([]);

  const { user, setLoader, hasPermission, theme } = useAuth();
  const clientId = user?.client_id ?? ""; // avoid `{}` ending up in the URL

  // Build helper maps from modules
  const permissionIdToName = useMemo(() => {
    const map = new Map<string | number, { name: string; module_id: string | number }>();
    for (const m of allModules) {
      const items = (m.permissions || []).map((p) =>
        typeof p === "string" ? ({ name: p } as PermissionTypeFromModule) : p
      );
      for (const p of items) {
        if (p.id != null) map.set(p.id, { name: p.name, module_id: m.id });
      }
    }
    return map;
  }, [allModules]);

  const moduleIdToBasePerms = useMemo(() => {
    const base = new Map<string | number, Record<string, boolean>>();
    for (const m of allModules) {
      const items = (m.permissions || []).map((p) =>
        typeof p === "string" ? ({ name: p } as PermissionTypeFromModule) : p
      );
      const obj: Record<string, boolean> = {};
      for (const p of items) obj[p.name] = false; // start unchecked
      base.set(m.id, obj);
    }
    return base;
  }, [allModules]);

  // ------------ Fetchers
  useEffect(() => {
    // Load reference data
    void fetchRoles();
    void fetchUsers();
    void fetchAllModules();
  }, []);

  useEffect(() => {
    // When switching tabs, clear the other selection to avoid confusion
    if (activeTab === 0) {
      setSelectedUser("");
      if (selectedRole) void fetchPermissionsForRole(selectedRole);
    } else {
      setSelectedRole("");
      if (selectedUser) void fetchPermissionsForUser(selectedUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 0 && selectedRole) void fetchPermissionsForRole(selectedRole);
  }, [selectedRole]);

  useEffect(() => {
    if (activeTab === 1 && selectedUser) void fetchPermissionsForUser(selectedUser);
  }, [selectedUser]);

  // Normalize whenever raw or modules change
  useEffect(() => {
    const normalized = normalize(rawPermissions, allModules, permissionIdToName, moduleIdToBasePerms);
    setPermissions(normalized);
  }, [rawPermissions, allModules, permissionIdToName, moduleIdToBasePerms]);

  const fetchRoles = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${apiBaseUrl}/role?client_id=${clientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setRoles(data?.data || []);
    } catch (e) {
      toast.error("Unable to fetch roles");
    } finally {
      setLoader(false);
    }
  };

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${apiBaseUrl}/user?client_id=${clientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setUsers(data?.data?.data || []);
    } catch (e) {
      toast.error("Unable to fetch users");
    } finally {
      setLoader(false);
    }
  };

  const fetchAllModules = async () => {
    setLoader(true);
    try {
      const res = await fetch(`${apiBaseUrl}/permission?by=module`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setAllModules((data?.data || []) as ModuleItem[]);
    } catch (e) {
      toast.error("Unable to fetch modules");
    } finally {
      setLoader(false);
    }
  };

  const fetchPermissionsForRole = async (roleId: string | number) => {
    setLoader(true);
    try {
      const res = await fetch(`${apiBaseUrl}/access-permission/role/${roleId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setRawPermissions(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      toast.error("Unable to fetch permissions for role");
    } finally {
      setLoader(false);
    }
  };

  const fetchPermissionsForUser = async (userId: string | number) => {
    setLoader(true);
    try {
      const res = await fetch(`${apiBaseUrl}/access-permission/user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setRawPermissions(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      toast.error("Unable to fetch permissions for user");
    } finally {
      setLoader(false);
    }
  };

  // -------------- Mutations
  const handlePermissionChange = (moduleId: string | number, permissionId: string | number, checked: boolean) => {
    setPermissions((prev: any[]) => {
      const index = prev.findIndex((p: any) => p.module_id === moduleId);
      if (index === -1) {
        return [...prev, {
          module_id: moduleId,
          permissions: { [permissionId]: checked }
        }];
      } else {
        const next = [...prev];
        next[index] = {
          ...next[index],
          permissions: {
            ...next[index].permissions,
            [permissionId]: checked,
          }
        };
        return next;
      }
    });
  };

  const handleSavePermissions = async () => {
    setLoader(true);
    // Build payload compatible with backend. If your backend expects permission IDs instead of names,
    // convert below using `permissionIdToName` inverse.
    const payload = permissions.map((p) => ({
      permissions: Object.keys(p.permissions).filter((key) => p.permissions[key]),
    }));

    let url = "";
    if (activeTab === 0 && selectedRole) {
      url = `${apiBaseUrl}/access-permission/role/${selectedRole}`;
    } else if (activeTab === 1 && selectedUser) {
      url = `${apiBaseUrl}/access-permission/user/${selectedUser}`;
    } else {
      toast.error("Please select a role or user first");
      setLoader(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload[0]),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err?.message || "Failed to update permissions.");
      }
    } catch (e) {
      toast.error("Failed to update permissions.");
    } finally {
      setLoader(false);
    }
  };

  // -------------- Helpers
  const getModulePermissions = (moduleId: string | number): Record<string, boolean> => {
    const row = permissions.find((p) => p.module_id == moduleId);
    // Ensure all known permission names for this module exist in the object (default false)
    const base = moduleIdToBasePerms.get(moduleId) || {};
    return { ...base, ...(row?.permissions || {}) };
  };

  return (
    <Box>
      <Typography component="h1" variant="h1" sx={{ color: theme?.heading?.color, mb: theme?.heading?.marginBottom }}>
        Role & User Permission
      </Typography>

      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} className="custom-tabs" sx={{ mb: "24px" }}>
        {hasPermission('role permission update') && (
          <Tab label="By Role" />
        )}

        {hasPermission('user permission update') && (
          <Tab label="By User" />
        )}
      </Tabs>

      <Box sx={{ p: 2, border: '1px solid #cccccc' }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
            {activeTab === 0 ? (
              <SingleSelect
                inputLabel='Role'
                value={roles.find((item) => selectedRole === item.id)?.name || ""}
                onChange={(e) => setSelectedRole(e.target.value)}
                size='small'
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </SingleSelect>
            ) : (
              <SingleSelect
                inputLabel='User'
                value={users.find((item) => selectedUser === item.id)?.name || ""}
                onChange={(e) => setSelectedUser(e.target.value)}
                size='small'
              >
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </SingleSelect>
            )}
          </Grid>
        </Grid>

        {(activeTab === 0 ? selectedRole : selectedUser) ? (
          <Box>
            <Typography variant="h4" component='h4' sx={{ mb: 2 }}>
              Permissions
            </Typography>

            <Grid container spacing={2}>
              {allModules.map((module) => {
                // const perms = getModulePermissions(module.id);
                const items = (module.permissions || []).map((p) =>
                  typeof p === "string" ? ({ name: p } as PermissionTypeFromModule) : p
                );
                const perms = permissions.find((p) => p.module_id === module.id)?.permissions || {};

                // collect all child keys
                const childKeys = module.permissions.map((p: any) => p.name);
                const childVals = childKeys.map((k: string) => !!perms[k]);

                // parent state
                const allChecked = childVals.length > 0 && childVals.every(Boolean);
                const someChecked = childVals.some(Boolean) && !allChecked;
                return (
                  <Grid size={{ lg: 2, md: 3, sm: 4, xs: 12 }} key={module?.slug} className={`className-${module?.slug}`}>
                    <Box
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        p: 1,
                        mb: 1,
                        background: "#f9f9f9",
                      }}
                    >
                      <Box sx={{ mb: 0.7, borderBottom: "1px solid #c1bebeff", bottomdisplay: "inline-block", pb: 0.5 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={allChecked}
                              indeterminate={someChecked}
                              onChange={(e) => {
                                setPermissions((prev) =>
                                  prev.map((p) =>
                                    p.module_id === module.id ? {
                                      ...p,
                                      permissions: { ...p.permissions, ...Object.fromEntries(childKeys.map((k) => [k, e.target.checked])), },
                                    } : p
                                  )
                                );
                              }}
                            />
                          }
                          label={module.slug.charAt(0).toUpperCase() + module.slug.slice(1)}
                        />
                      </Box>

                      {items.map((type) => (
                        <FormControlLabel
                          key={`${module.id}-${type.name}`}
                          control={
                            <Checkbox
                              checked={!!perms[type.name]}
                              size="small"
                              onChange={(e) =>
                                handlePermissionChange(module.id, type.name, e.target.checked)
                              }
                            />
                          }
                          label={type.name.replace(/^./, (c) => c.toUpperCase())}
                          sx={{ '& span.MuiTypography-root': { fontFamily: 'poppins-lt', fontSize: '14px' } }}
                        />
                      ))}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" className="btn btn-blue" onClick={handleSavePermissions}>
                Save Permissions
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography color="text.secondary">Select a role or user to manage permissions.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default RoleUserPermission;

// ------------------
// Normalizer: converts many possible backend shapes to the UI shape
// ------------------
function normalize(
  raw: RawPermissionRow[],
  modules: ModuleItem[],
  idToName: Map<string | number, { name: string; module_id: string | number }>,
  baseMap: Map<string | number, Record<string, boolean>>
): NormalizedRow[] {
  if (!Array.isArray(raw) || modules.length === 0) return [];

  // Create a starting map with all modules present and all perms false
  const resultMap = new Map<string | number, Record<string, boolean>>();
  for (const [mid, base] of baseMap.entries()) {
    resultMap.set(mid, { ...base });
  }

  const applyPerm = (
    module_id: string | number,
    permName: string,
    allowed: boolean
  ) => {
    if (!resultMap.has(module_id)) {
      // Create a base row if the module wasn't in modules list for some reason
      resultMap.set(module_id, { [permName]: !!allowed });
      return;
    }
    const row = resultMap.get(module_id)!;
    row[permName] = !!allowed;
  };

  for (const row of raw) {
    // Case A: {module_id, permissions: {create: true, ...}}
    if (row && row.module_id != null && row.permissions && typeof row.permissions === "object") {
      for (const [k, v] of Object.entries(row.permissions)) applyPerm(row.module_id, k, !!v);
      continue;
    }

    // Case B: {module_id, permission: "create"} or {module_id, permission_name: "create"}
    if (row && row.module_id != null && (row.permission || row.permission_name || row.name)) {
      const name = row.permission || row.permission_name || row.name;
      if (typeof name === "string") applyPerm(row.module_id, name, true);
      continue;
    }

    // Case C: {permission_id} or array of permission ids
    if (row && (row.permission_id != null || row.id != null)) {
      const pid = row.permission_id ?? row.id;
      const meta = idToName.get(pid);
      if (meta) applyPerm(meta.module_id, meta.name, true);
      continue;
    }

    // Case D: {module_id, permissions: ["create", "read"]}
    if (row && row.module_id != null && Array.isArray(row.permissions)) {
      for (const p of row.permissions) {
        if (typeof p === "string") applyPerm(row.module_id, p, true);
        else if (p && typeof p === "object" && typeof p.name === "string") applyPerm(row.module_id, p.name, true);
      }
      continue;
    }
  }

  const out: NormalizedRow[] = [];
  for (const [module_id, obj] of resultMap.entries()) out.push({ module_id, permissions: obj });
  return out;
}
