import { z } from "zod";

export const formSchema = z.object({
    gitLogin: z
        .string()
        .min(2, "Request must be at least 2 characters long")
        .max(39, "Request must be at most 39 characters long"),
    gitToken: z
        .string()
        .min(1, "GitHub token is required")
        .max(100, "Token must be at most 100 characters long"),
});
