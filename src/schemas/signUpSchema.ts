import z from "zod"

export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long"),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: "Passwords do not match",
            path: ["confirmPassword"]
        })
    }
})
