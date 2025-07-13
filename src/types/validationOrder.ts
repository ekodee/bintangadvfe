import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  post_code: z.string().min(1, "Post code is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

export const paymentSchema = z.object({
  proof: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Proof of payment is required"),
});

export const viewOrderSchema = z.object({
  order_trx_id: z.string().min(1, "Order TRX is required"),
  email: z.string().min(1, "email number is required"),
});
