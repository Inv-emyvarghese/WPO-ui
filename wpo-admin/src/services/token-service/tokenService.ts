import { getRefreshToken } from "@/utils/tokenUtils";
import axiosInstance from "../axiosInstance";

// Function to refresh the access token using the stored refresh token
export const refreshToken = async () => {
  const refreshToken = getRefreshToken(); // Get the refresh token from storage or wherever it's kept
  const response = await axiosInstance.put("/api/login", {
    refresh_token: refreshToken,
  });

  return response.data;
};

//Function for extarct jwt token
export function decodeJwt(idToken: string): Record<string, unknown> | null {
  try {
    const base64Url = idToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid ID token", error);
    return null;
  }
}
