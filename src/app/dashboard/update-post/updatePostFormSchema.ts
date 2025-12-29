import z from "zod";

export const category = [
  "ui",
  "ux",
  "ai",
  "develop",
  "design",
  "marketing",
] as const;

export const formSchema = z.object({
  title: z.string().min(3, {
    error: "Too small: expected string to have more than 3 characters",
  }),
  category: z.string()
  .refine((val) => val !== "category", {
    message: "Please select a category",
  }),
  image: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || ["image/png", "image/jpeg", "image/jpg"].includes(files?.type),
      "Only PNG / JPG allowed"
    )
    .refine((files) => !files || files?.size <= 5 * 1024 * 1024, "Max size is 5MB"),
  content: z.string(),
});
export type formSchemaType = z.infer<typeof formSchema>;
