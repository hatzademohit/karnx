import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";

interface ApiOptions extends RequestInit {
	body?: any;
	skip?: boolean; // If true, prevents auto-fetch
	method?: string; // Allow passing HTTP method
}

interface ApiResponse<T> {
	data: T | null;
	error?: string | null;
	refetch: () => void;
	loading?: boolean;
}

export function useApi<T = unknown>(url: string, options?: ApiOptions): ApiResponse<T> {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { karnxToken, setLoader, validateSession } = useAuth();

	const fetchData = useCallback(async () => {
		setLoader(true);
		setError(null);

		try {
			const valid = await validateSession();
			if (!valid) return;
			const response = await fetch(url, {
				method: options?.method || "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${karnxToken || ""}`,
					...(options?.headers || {}),
				},
				body: options?.body ? JSON.stringify(options.body) : undefined,
			});

			if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

			const result = await response.json();
			setData(result.data || result);
		} catch (err: any) {
			setError(err.message || "Something went wrong");
		} finally {
			setLoader(false);
		}
	}, [url, karnxToken]); // removed object-based deps


	return { data, error, refetch: fetchData };
}
