import { defaultEndpointsFactory } from 'express-zod-api';
import { authMiddlewareToken } from '../middlewares';
import {
    loginCredentialsUserSchema,
    loginUserSchema,
    outputDecodedTokenSchema,
    outputLoginCredentialsUserSchema,
    outputLoginUserSchema,
    outputRegisterSchema,
    registerUserSchema,
} from '../zodSchemas/userZodSchema';
import { login } from '../services/auth/authService';
import {
    decodeToken,
    loginWithCredentials,
    register,
} from '../services/auth/authCredentialsService';
import { z } from 'zod';

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

export const decodeTokenRoute = defaultEndpointsFactory
    .addMiddleware(authMiddlewareToken)
    .build({
        shortDescription: 'Decode token',
        description: 'Decode token',
        method: 'get',
        input: z.object({}),
        output: outputDecodedTokenSchema,
        handler: async ({ input, options, logger }) => {
            logger.info('Decode token', options.token);
            return decodeToken(options.token);
        },
    });
