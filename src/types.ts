export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'coffee' | 'cold-brew' | 'tea' | 'pastry';
  sweetness: number; // 0-100 rating for process section visualizer
  acidity: number; // 0-100 rating
  body: number; // 0-100 rating
  image: string;
  alt: string;
  customizable: boolean;
}

export interface MenuItemCustomization {
  size: 'Standard' | 'Large';
  milk: 'Whole Milk' | 'Skim Milk' | 'Oat Milk' | 'Almond Milk' | 'None';
  sweetness: 'None' | 'Less' | 'Standard' | 'Extra';
  temperature: 'Hot' | 'Iced';
  specialNotes?: string;
}

export interface CartItem {
  id: string; // unique cart instance id (item.id + serialized customization options)
  menuItem: MenuItem;
  quantity: number;
  customization: MenuItemCustomization;
}

export interface OrderDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: 'pickup' | 'delivery';
  pickupTime?: string;
  address?: string;
  paymentMethod: 'card' | 'apple-pay' | 'cash';
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}
