/* eslint-disable prettier/prettier */
import z from "zod";



export const UserSchema = z.object({
    name: z.string().min(1, 'name field is required'),
    email: z.string().email(),
    password: z.string().nonempty(),
});

export type CreateUser = z.infer<typeof UserSchema>
export type UpdateUser = Partial<CreateUser>