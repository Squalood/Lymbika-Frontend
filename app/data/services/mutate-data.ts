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
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: payload ? JSON.stringify(payload) : undefined, 
    });

    if (method === "DELETE") {
      return response.ok;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in mutateData:", error);
    throw error;
  }
}
