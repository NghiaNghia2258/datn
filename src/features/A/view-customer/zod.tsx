import { z } from "zod";

// 🎯 Các field bắt buộc (ngoại trừ email đã được chuyển xuống optional)
const RequiredCustomerFields = {
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\d{10,11}$/, {
    message: "Số điện thoại không hợp lệ",
  }),
  password: z.string().min(6).max(100),
};

// 🎯 Các field tùy chọn
const OptionalCustomerFields = {
  email: z.string().email().optional(), // ⬅ email không bắt buộc
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().max(255).optional(),
};

// ✅ Schema khi tạo
export const CustomerCreateSchema = z.object({
  ...RequiredCustomerFields,
  ...OptionalCustomerFields,
});

// ✅ Schema khi cập nhật
export const CustomerUpdateSchema = CustomerCreateSchema.extend({
  id: z.string(),
});

// ✅ Schema đầy đủ
export const CustomerSchema = z.object({
  id: z.string(),
  ...RequiredCustomerFields,
  ...OptionalCustomerFields,
  isActive: z.boolean().default(true),
});

// ✅ Types
export type CustomerCreate = z.infer<typeof CustomerCreateSchema>;
export type CustomerUpdate = z.infer<typeof CustomerUpdateSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
