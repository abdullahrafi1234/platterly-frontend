import api from "@/lib/axios";

export const getAllProviders = async () => {
  const res = await api.get("/providers");
  return res.data;
};

export const getProviderById = async (id: string) => {
  const res = await api.get(`/providers/${id}`);
  return res.data;
};
