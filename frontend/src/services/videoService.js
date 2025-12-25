import api from "../api/axios";

export const getAllVideos = async () => {
  const response = await api.get("/videos");
  return response.data;
};

export const createVideo = async (video) => {
  const response = await api.post("/videos", video);
  return response.data;
};

export const deleteVideo = async (id) => {
  await api.delete(`/videos/${id}`);
};

export const updateVideo = async (id, video) => {
  const response = await api.put(`/videos/${id}`, video);
  return response.data;
};