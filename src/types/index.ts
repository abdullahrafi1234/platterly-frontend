export interface Category {
  id: string;
  name: string;
}

export interface Meal {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  category: Category;
  provider: {
    id: string;
    businessName: string;
    logo?: string;
  };
}
