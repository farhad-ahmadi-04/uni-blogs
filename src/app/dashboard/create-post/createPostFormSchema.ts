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
  category: z.string().min(1, "Please select a category"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Please upload an image")
    .refine(
      (files) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(files?.[0]?.type),
      "Only PNG / JPG allowed"
    )
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "Max size is 5MB"),
  blog: z.string(),
});
export type formSchemaType = z.infer<typeof formSchema>;
