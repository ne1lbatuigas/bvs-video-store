import api from "../api/axios";

// VIDEO INVENTORY REPORT
export const getVideoInventoryReport = async () => {
  const res = await api.get("/reports/videos");
  return res.data;
};

// CUSTOMER RENTAL REPORT
export const getCustomerRentalReport = async () => {
  const res = await api.get("/reports/customers");
  return res.data;
};

// RENTAL HISTORY REPORT
export const getRentalHistoryReport = async () => {
  const res = await api.get("/reports/history");
  return res.data;
};
