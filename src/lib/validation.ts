import { z } from "zod";

const optionalString = z.string().optional();

export const jobFilterSchema = z.object({
  q: optionalString,
  location: optionalString,
  type: optionalString,
  remote: z.coerce.boolean().optional(),
});

export type jobFilterValues = z.infer<typeof jobFilterSchema>