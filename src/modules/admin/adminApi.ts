import api from "@/lib/axios";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const updateUserStatus = async (id: string, status: string) => {
  const res = await api.patch(`/admin/users/${id}/status`, { status });
  return res.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};
