import api from "@/lib/axios";

export const getAllMeals = async (params?: Record<string, string>) => {
  const res = await api.get("/meals", { params });
  return res.data;
};

export const getMealById = async (id: string) => {
  const res = await api.get(`/meals/${id}`);
  return res.data;
};

export const getMyMeals = async () => {
  const res = await api.get("/meals/my-meals");
  return res.data;
};

export const createMeal = async (data: any) => {
  const res = await api.post("/meals", data);
  return res.data;
};

export const updateMeal = async (id: string, data: any) => {
  const res = await api.put(`/meals/${id}`, data);
  return res.data;
};

export const deleteMeal = async (id: string) => {
  const res = await api.delete(`/meals/${id}`);
  return res.data;
};
