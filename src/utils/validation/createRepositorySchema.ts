import z from "zod";

export const createRepositorySchema = z.object({
    name: z
        .string()
        .min(1, "Repository name is required")
        .max(100, "Repository name must be at most 100 characters long"),
    description: z.string().max(256, "Description must be at most 256 characters long").optional(),
    isPrivate: z
        .string()
        .refine((val) => val === "yes" || val === "no", {
            message: "Please select if the repository is private or not",
        })
        .transform((val) => {
            return val === "yes" ? true : false;
        }),
});
