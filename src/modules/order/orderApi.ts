import api from "@/lib/axios";

export const createOrder = async (data: {
  deliveryAddress: string;
  items: { mealId: string; quantity: number }[];
}) => {
  const res = await api.post("/orders", data);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders/my-orders");
  return res.data;
};

export const getProviderOrders = async () => {
  const res = await api.get("/orders/provider-orders");
  return res.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await api.patch(`/orders/${id}/status`, { status });
  return res.data;
};

export const cancelOrder = async (id: string) => {
  const res = await api.patch(`/orders/${id}/cancel`);
  return res.data;
};

export const initPayment = async (orderId: string) => {
  const res = await api.post(`/payment/init/${orderId}`);
  return res.data;
};

export const initStripePayment = async (orderId: string) => {
  const res = await api.post(`/payment/stripe/init/${orderId}`);
  return res.data;
};
