
export interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  serviceType: string;
  date: string;
  location: string;
  specialInstructions?: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'bouquet' | 'single' | 'gift';
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceStart: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  serviceType: string;
  rating: number;
}

export type ViewState = 'home' | 'admin' | 'booking' | 'checkout';
