interface Feature {
  id: number;
  name: string;
}

interface Photo {
  id: number;
  photo: string;
}

interface Testimonial {
  id: number;
  name: string;
  rating: string;
  message: string;
  photo: string;
}

export interface Product {
  id: number;
  price: number;
  duration: number;
  name: string;
  slug: string;
  is_popular: boolean;
  category: Category;
  brand: Brand;
  thumbnail: string;
  features: Feature[];
  photos: Photo[];
  testimonials: Testimonial[];
  about: string;
  stock: number;
  min_order?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  photo: string;
  products_count: number;
  products: Product[];
  popular_products: Product[];
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  photo: string;
  products_count: number;
  products: Product[];
  popular_products: Product[];
}

export interface OrderDetails {
  id: number;
  name: string;
  phone: string;
  email: string;
  proof: string | null;
  address: string;
  post_code: string;
  city: string;
  order_trx_id: string;
  quantity: number;
  is_paid: boolean;
  sub_total_amount: number;
  total_tax_amount: number;
  total_amount: number;
   transaction_details: TransactionDetail[];
}

export interface TransactionDetail{
  id: number;
  price: number;
  product_id: number;
  quantity: number;
  product: Product;
}

export interface CartItem {
  product_id: number;
  slug: string;
  quantity: number;
}

export type OrderFormData = {
  name: string;
  email: string;
  phone: string;
  post_code: string;
  address: string;
  city: string;
};
