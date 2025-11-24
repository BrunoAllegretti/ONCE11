export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  priceOld?: number;
  price: number;
  filters?: string[];
  quantity?: number;
  size?: string;
  type?: string;
  color?: string;
  isBestSeller?: boolean;
}
