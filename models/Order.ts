import { CartItem, Product } from "./Product";
import { User } from "./User";

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface Order {
    _id: string;
    id?: string;
    cartItems : CartItem[];
    isPaid?: boolean;
    paymentMethodType: string;
    shippingPrice: number;
    taxPrice: number;
    totalOrderPrice: number;
    updatedAt: string;
    user: User;
    __v: number;
    isDelivered?: boolean;
    createdAt: string;
}