import {z} from 'zod'


export const usernameValidation = z.string().max(30 , {message: "Username should not be more than 30 characters"}).min(4)

export const passwordValidation = z.string()
.min(6 , {message: "Password should be of at least 6 characters"})
.max(16 , {message: "password cannot be more thant 16 characters "})

