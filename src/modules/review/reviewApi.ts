import api from "@/lib/axios";

export const getMealReviews = async (mealId: string) => {
  const res = await api.get(`/reviews/meal/${mealId}`);
  return res.data;
};

export const createReview = async (data: {
  mealId: string;
  rating: number;
  comment?: string;
}) => {
  const res = await api.post("/reviews", data);
  return res.data;
};
