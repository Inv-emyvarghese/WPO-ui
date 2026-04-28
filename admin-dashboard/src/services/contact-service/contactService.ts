import axiosInstance from "../axiosInstance";

// Get all contacts: Sends a GET request to fetch all contacts with search, sort, and pagination parameters
export const getAllContacts = async (
  searchValue: string,
  sortKey: string,
  sortType: string,
  page: number,
  limit:number
) => {
  const response = await axiosInstance.get(
    `/api/contacts?search=${searchValue}&sort_key=${sortKey}&sort_order=${sortType}&page=${page}&limit=${limit}`
  );
  return response.data;
};

// Delete contact by ID: Sends a DELETE request to remove a contact by its ID
export const deleteContactById = async (contactId: number) => {
  const response = await axiosInstance.delete(`/api/contacts/${contactId}`);
  return response.data;
};

// Create contact: Sends a POST request to create a new contact
export const createContact = async (requestBody: object) => {
  const response = await axiosInstance.post(`/api/contacts`, requestBody);
  return response.data;
};

// Update contact: Sends a PUT request to update an existing contact by its ID
export const updateContact = async (requestBody: object, contactId: number) => {
  const response = await axiosInstance.put(
    `/api/contacts/${contactId}`,
    requestBody
  );
  return response.data;
};

// Get contact by ID: Sends a GET request to fetch a specific contact by its ID
export const getContactById = async (contactId: number) => {
  const response = await axiosInstance.get(`/api/contacts/${contactId}`);
  return response.data;
};

// Get contact by ID: Sends a GET request to fetch a specific contact by its ID
export const getCountryList = async () => {
  const response = await axiosInstance.get(`/api/countries`);
  return response.data;
};

// // Address auto fill API by Zip code
export const addressAutoFill = async (zipcode: string) => {
  const response = await axiosInstance.get(`/api/address?zip_code=${zipcode}`);
  return response.data;
};

// get contcats count
export const getContactCount = async () => {
  const response = await axiosInstance.get(`/api/user-dashboard`);
  return response.data;
};