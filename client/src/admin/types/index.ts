export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus = "Pending" | "Success" | "Failed";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

export interface AdminProduct {
  id: number;
  itemName: string;
  itemDescription?: string;
  itemPrice: number;
  categoryId: number;
  categoryName?: string;
  stockQuantity: number;
  discountPercent: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface AdminOrder {
  id: number;
  userId: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface InventoryAlert {
  productId: number;
  productName: string;
  stockQuantity: number;
  isActive: boolean;
}

export interface AdminCategory {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

