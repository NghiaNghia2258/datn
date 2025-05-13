// src/schemas/inbound-receipt.schema.ts
import { z } from 'zod';

export const InboundItemSchema = z.object({
  id: z.string().min(1, 'Id không được để trống'),
  name: z.string().min(1),
  image: z.string().optional(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),

});

export const InboundReceiptCreateSchema = z.object({
  stockInDate: z.string(),              // ISO datetime string
  supplierId: z.string().optional(),             // Optional
  note: z.string().optional(),
  items: z.array(InboundItemSchema).min(1, 'Phải có ít nhất 1 sản phẩm'),
});

export const InboundReceiptUpdateSchema = z.object({
  receiptId: z.string().min(1, 'Mã phiếu không được để trống'),
  updatedBy: z.string().min(1),
  note: z.string().optional(),
  items: z.array(InboundItemSchema).min(1),
});

export type IInboundReceiptCreateSchema = z.infer<typeof InboundReceiptCreateSchema>;
export type IInboundReceiptUpdateSchema = z.infer<typeof InboundReceiptCreateSchema> & {id:string};
export type IInboundItemSchema = z.infer<typeof InboundItemSchema>;

export interface InboundProduct {
  id: string;
  name: string;
  image: string;
  inventory: number;
}