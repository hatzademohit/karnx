import { useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";

// Lightweight hook that exposes a single callApi function
// - dynamic method/URL/body
// - automatically adds Bearer token
// - toggles global loader via AuthContext
// - returns whatever the API responds with (no shaping)
// Usage:
// const callApi = useApiFunction();
// const data = await callApi({ method: 'POST', url: '/api/item', body: { a: 1 } });

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string;

export interface CallApiArgs extends RequestInit {
  url: string;
  method?: HttpMethod;
  body?: any; // JSON object or FormData
}

export default function useApiFunction() {
  const { karnxToken, setLoader, validateSession } = useAuth();

  const callApi = useCallback(async <T = any>({ url, method = "GET", body, headers, ...rest }: CallApiArgs): Promise<T> => {
    setLoader(true);
    try {
      const valid = await validateSession();
      if (!valid) return;
      const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

      const baseHeaders: Record<string, string> = {
        Authorization: `Bearer ${karnxToken || ""}`,
        ...(headers as any),
      };

      // Only set JSON content-type when not sending FormData and body exists
      if (!isFormData && body !== undefined && !(baseHeaders as any)["Content-Type"]) {
        baseHeaders["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method,
        headers: baseHeaders,
        body: body === undefined ? undefined : (isFormData ? body : JSON.stringify(body)),
        ...rest,
      });

      // Try to parse JSON; if not JSON, return raw text/blob as-is
      const contentType = response.headers.get("content-type") || "";

      let payload: any;
      if (contentType.includes("application/json")) {
        payload = await response.json();
      } else if (contentType.includes("text/")) {
        payload = await response.text();
      } else {
        // fallback to blob for other types
        payload = await response.blob();
      }

      if (!response.ok) {
        // Propagate exact server response
        const error: any = new Error(typeof payload === "string" ? payload : (payload?.message || response.statusText));
        error.status = response.status;
        error.payload = payload;
        throw error;
      }

      return payload as T;
    } finally {
      setLoader(false);
    }
  }, [karnxToken, setLoader]);

  return callApi;
}


/*
// Utilization of the hook API
In any component: 
const callApi = useApiFunction(); 
// GET const items = await callApi({ url: '/api/items' }); 
// POST (JSON) const created = await callApi({ method: 'POST', url: '/api/items', body: { name: 'A' } }); 
// PUT (JSON) const updated = await callApi({ method: 'PUT', url: /api/items/${id}, body: { name: 'B' } }); 
// DELETE await callApi({ method: 'DELETE', url: /api/items/${id} }); 
// FormData upload const fd = new FormData(); fd.append('file', file); const uploadResult = await callApi({ method: 'POST', url: '/api/upload', body: fd });
*/