import api from "@/lib/axios";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
  phone?: string;
  address?: string;
  businessName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterInput) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginInput) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const updateProfile = async (data: {
  name?: string;
  phone?: string;
  address?: string;
}) => {
  const res = await api.patch("/auth/me", data);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
