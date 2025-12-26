import api from "../api/axios";

export const createRental = async (rentalData) => {
  const response = await api.post("/rentals", rentalData);
  return response.data;
};

export const getRentals = async () => {
  const response = await api.get("/rentals");
  return response.data;
};

export const returnRental = async (id) => {
  const response = await api.put(`/rentals/${id}/return`);
  return response.data;
};