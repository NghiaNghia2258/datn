import { z } from "zod";

// Định nghĩa schema dùng Zod
const EmployeeSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  phone: z.string().regex(/^0\d{9}$/, "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0"),
  gender: z.enum(["Nam", "Nữ", "Khác"]),
  mail: z.string().email("Email không hợp lệ"),
});
export type Employee = z.infer<typeof EmployeeSchema>;