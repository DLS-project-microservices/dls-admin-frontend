export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categories: { id: number; name: string }[];
}
