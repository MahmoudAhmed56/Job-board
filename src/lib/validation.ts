import { literal, z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const optionalString = z.string().optional();
const requiredString = z.string().min(1, "Required");

const numericString = z
  .string()
  .min(1, "Required")
  .max(9, "Number can't be longer than 9 digits")
  .regex(/^\d+$/, "Must be a number")
  .optional();
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "file must be less than 2MB");
const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(literal("")),
    applicationUrl: z.string().max(100).email().optional().or(literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });
const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type"
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    }
  );

export type CreateJobValues = z.infer<typeof createJobSchema>

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type"
    ),
    companyName: requiredString.max(100),
    companyLogoUrl: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericString,
  })
  .and(applicationSchema)
  .and(locationSchema);

export const jobFilterSchema = z.object({
  q: optionalString,
  location: optionalString,
  type: optionalString,
  remote: z.coerce.boolean().optional(),
});

export type jobFilterValues = z.infer<typeof jobFilterSchema>;
