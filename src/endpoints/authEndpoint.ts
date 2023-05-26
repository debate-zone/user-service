import { defaultEndpointsFactory } from 'express-zod-api';
import { authMiddlewareToken } from '../middlewares';
import {
    loginUserSchema,
    outputLoginUserSchema,
    registerUserSchema,
    userSchema,
} from '../zodSchema';
import { User } from '../types';
import { login, register } from '../services/auth/authService';

export const loginRoute = defaultEndpointsFactory
    .addMiddleware(authMiddlewareToken)
    .build({
        shortDescription: 'Login user',
        description: 'Login user',
        method: 'post',
        input: loginUserSchema,
        output: outputLoginUserSchema,
        handler: async ({ input, options, logger }) => {
            logger.info('Login user', input);
            return await login(input, options);
        },
    });

export const registerRoute = defaultEndpointsFactory.build({
    shortDescription: 'Register user',
    description: 'Register user',
    method: 'post',
    input: registerUserSchema,
    output: userSchema,
    handler: async ({ input, options, logger }): Promise<User> => {
        logger.info('Register user', input);
        return await register(input);
    },
});
