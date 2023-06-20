import {z} from 'zod'

export const registerSchema = z.object({
    name: z.string({
        required_error: "Username is required ..."
    }),
    email: z.string({required_error: "Email is required ..."}).email({required_error: "Must have an email ..."}),
    password: z.string({required_error: "Password is required"}).min(6,{
        message: "Password must be at least 6 characters ... "
    })
});


export const loginSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({required_error: "Must be an email"}),
    password: z.string({required_error: "Password is required"}).min(6,
        {message:"Password mus be at least 6 characters"})
});