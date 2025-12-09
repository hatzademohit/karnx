import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";

interface ApiOptions extends RequestInit {
    body?: any;
    skip?: boolean; // If true, prevents auto-fetch
    method?: string; // Allow passing HTTP method
}

interface ApiResponse<T> {
    data: T | any;
    error?: string | null;
    refetch: () => void;
    loading?: boolean;
}

export function useResponceApi<T = unknown>(url: string, options?: ApiOptions): ApiResponse<T> {
    const [data, setData] = useState<T | any>(null);
    const [error, setError] = useState<string | null>(null);
    const { karnxToken, setLoader, validateSession } = useAuth();

    const fetchData = useCallback(async () => {
        setLoader(true);
        setError(null);
        try {
            const valid = await validateSession();
            if (!valid) return;
            const isFormData = typeof FormData !== 'undefined' && options?.body instanceof FormData;

            const baseHeaders: Record<string, string> = {
                Authorization: `Bearer ${karnxToken || ""}`,
                ...(options?.headers as any || {}),
            };
            // Only set JSON Content-Type when not sending FormData
            if (!isFormData && options?.body !== undefined) {
                baseHeaders["Content-Type"] = baseHeaders["Content-Type"] || "application/json";
            }

            const response = await fetch(url, {
                method: options?.method || "GET", // Default to GET
                headers: baseHeaders,
                body: options?.body !== undefined
                    ? (isFormData ? (options.body as any) : JSON.stringify(options.body))
                    : undefined,
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const result = await response.json();
            //console.log(result);
            setData(result || result);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoader(false);
        }
    }, [url, options?.method, options?.body, options?.headers, karnxToken]);

    // Run only once on mount if skip = false
    useEffect(() => {
        if (!options?.skip) fetchData();
    }, [fetchData, options?.skip]);

    return { data, error, refetch: fetchData };
}
