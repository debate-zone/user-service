import {
    loginCredentialsUserSchema,
    loginUserSchema,
    newUserSchema,
    outputLoginCredentialsUserSchema,
    outputLoginUserSchema,
    outputRegisterSchema,
    registerUserSchema,
    userSchema,
} from './zodSchema';
import { z } from 'zod';

export type User = z.infer<typeof userSchema>;

export type RegisterUser = z.infer<typeof registerUserSchema>;
export type OutputRegister = z.infer<typeof outputRegisterSchema>;

export type LoginCredentialsUser = z.infer<typeof loginCredentialsUserSchema>;

export type LoginUser = z.infer<typeof loginUserSchema>;

export type OutputLoginUser = z.infer<typeof outputLoginUserSchema>;

export type NewUser = z.infer<typeof newUserSchema>;

export type OutputLoginCredentialsUser = z.infer<
    typeof outputLoginCredentialsUserSchema
>;
