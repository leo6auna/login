import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({required_error: "Title is required"}),
    description: z.string({required_error: "Description must be at least 5 characters"}).optional(),
    date: z.string().datetime().optional()
});