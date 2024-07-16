import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(20, { message: "Content must be at least 10 characters." })
    .max(50, { message: "Content must not be longer than 300 characters." }),

  createdAt: z.date(),
});
