import axios from "axios";

// Base URL for API requests, pulled from environment variables
const baseURL = import.meta.env.VITE_API_URL;

// Login user: Sends a POST request to the login API endpoint
export const login = async (requestBody: object) => {
  const response = await axios.post(`${baseURL}/api/login`, requestBody);
  return response.data;
};



//SSO login
export const googleSSO = async (
  requestBody: object,
  type: string,
  confirmation: boolean
) => {
  const response = await axios.post(
    `${baseURL}/api/sso?mode=${type}&force=${confirmation}`,
    requestBody
  );
  return response.data;
};
