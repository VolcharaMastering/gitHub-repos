import { z } from "zod";

export const updateFormSchema = z.object({
    gitLogin: z
        .string()
        .min(2, "Request must be at least 2 characters long")
        .max(39, "Request must be at most 39 characters long"),
    gitToken: z
        .string()
        .min(1, "GitHub token is required")
        .max(100, "Token must be at most 100 characters long"),
    description: z.string().max(256, "Description must be at most 256 characters long").optional(),
    visibility: z.enum(["public", "private"], {
        error: "Visibility must be either 'public' or 'private'",
    }),
});
