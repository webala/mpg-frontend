/** @format */


export type User = {
   username?: string;
   id?: number;
   email?: string;
   groups: string[];
   cars: Car[];
};

export type UserState = {
   isAuth: boolean;
   user: User;
};

export type Car = {
   body_type: string;
   engine: string;
   id: number;
   make: string;
   model: string;
   series: string;
   year: string;
   isSelected?: boolean;
};

export type CarState = {
   cars: Car[];
};

export type PartShape = {
   brand: string;
   cars: Car[];
   category: string;
   description: string;
   id: number;
   image_filename?: string;
   image_url?: string;
   inventory: number;
   name: string;
   part_no: string;
   price: string;
};

export type OrderItem = {
   part: PartShape;
   quantity: number;
};

export type ClientShape = {
   first_name: string;
   last_name: string;
   phone_number: string;
   email: string;
   is_subscribed: boolean;
   id?: number;
};

export type ShippingAddress = {
   id?: number;
   location: string;
   building: string;
   house_number: string;
   description: string;
   client: ClientShape;
};

export type OrderShape = {
   id?: number;
   shipping_address: ShippingAddress;
   is_complete: boolean;
   date_created: string;
};

export type CartItem = {
   productId: number;
   quantity: number;
};

export type Cart = {
   cartItems: CartItem[];
};

export type GlobalState = {
   user: UserState;
   cars: CarState;
   cart: Cart;
};
