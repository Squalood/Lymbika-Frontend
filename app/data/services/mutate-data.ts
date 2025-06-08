import { getAuthToken } from "./get-token";

export async function mutateData(
  method: string,
  path: string,
  payload?: Record<string, unknown>
) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    const contentType = response.headers.get("Content-Type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorBody = isJson ? await response.json() : await response.text();
      console.error("🟥 Error response from mutateData:", {
        status: response.status,
        errorBody,
      });
      return {
        error: {
          status: response.status,
          message: errorBody?.error?.message || "Unknown error",
          details: errorBody?.error?.details || null,
        },
      };
    }

    return isJson ? await response.json() : {};
  } catch (error) {
    console.error("🔴 Exception in mutateData:", error);
    throw error;
  }
}
