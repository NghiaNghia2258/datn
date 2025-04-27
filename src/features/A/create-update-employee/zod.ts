import { z } from "zod";

export const EmployeeCreateSchemaSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }).default(""),
  phone: z
    .string()
    .default("")
    .refine((val) => /^0\d{9}$/.test(val), {
      message: "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0",
    }),
  gender: z.enum(["Nam", "Nữ", "Khác"]).default("Nam"),
  mail: z
    .string()
    .default("")
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), {
      message: "Email không hợp lệ",
    }),
});


  export type EmployeeCreateSchema = z.infer<typeof EmployeeCreateSchemaSchema>;
  export type EmployeeUpdateSchema = z.infer<typeof EmployeeCreateSchemaSchema> & {code:string};