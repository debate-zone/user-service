import { defaultEndpointsFactory } from 'express-zod-api';
import { authMiddlewareToken } from '../middlewares';
import {
    loginCredentialsUserSchema,
    loginUserSchema,
    outputLoginCredentialsUserSchema,
    outputLoginUserSchema,
    outputRegisterSchema,
    registerUserSchema,
} from '../zodSchema';
import { login } from '../services/auth/authService';
import {
    loginWithCredentials,
    register,
} from '../services/auth/authCredentialsService';

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

export const loginWithCredentialsRoute = defaultEndpointsFactory.build({
    shortDescription: 'Login user with credentials',
    description: 'Login user with credentials',
    method: 'post',
    input: loginCredentialsUserSchema,
    output: outputLoginCredentialsUserSchema,
    handler: async ({ input, options, logger }) => {
        logger.info('Login user with credentials', input);
        return await loginWithCredentials(input);
    },
});

export const registerRoute = defaultEndpointsFactory.build({
    shortDescription: 'Register user',
    description: 'Register user',
    method: 'post',
    input: registerUserSchema,
    output: outputRegisterSchema,
    handler: async ({ input, options, logger }) => {
        logger.info('Register user', input.email);
        return await register(input);
    },
});
