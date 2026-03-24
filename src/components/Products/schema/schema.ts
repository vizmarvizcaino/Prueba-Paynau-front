import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0"),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ProductFormData = z.infer<typeof productSchema>;
