export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
}

export interface Booking {
  id: string;
  service_id: string;
  user_id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface SalonInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: {
    [key: string]: { open: string; close: string };
  };
  social_media: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}
