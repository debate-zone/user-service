import { createHttpError, createMiddleware } from 'express-zod-api';
import { z } from 'zod';
import { login } from './services/auth/authService';
import { TokenProviderEnum } from './utils/enums/TokenProviderEnum';

export const authMiddleware = createMiddleware({
    security: {
        type: 'bearer',
    },
    input: z.object({
        key: z.string().min(1).optional(),
    }),
    middleware: async ({ input: { key }, request, logger }) => {
        logger.debug('Checking the token');

        if (
            !request.headers.authorization ||
            !request.headers.authorization.startsWith('Bearer ')
        ) {
            throw createHttpError(401, 'Invalid token');
        }

        const token = request?.headers?.authorization?.split(' ')[1];
        const provider = request.headers[
            'x-auth-provider'
        ] as TokenProviderEnum;

        const loggedUser = await login(
            {
                provider: provider,
            },
            {
                token,
                provider,
            },
        );

        return {
            token,
            loggedUser: loggedUser,
        };
    },
});

export const authMiddlewareToken = createMiddleware({
    security: {
        type: 'bearer',
    },
    input: z.object({
        key: z.string().min(1).optional(),
    }),
    middleware: async ({ input: { key }, request, logger }) => {
        logger.debug('Checking the token');

        if (
            !request.headers.authorization ||
            !request.headers.authorization.startsWith('Bearer ')
        ) {
            throw createHttpError(401, 'Invalid token');
        }
        return {
            token: request.headers.authorization.split(' ')[1],
            provider: request.headers['x-auth-provider'] as TokenProviderEnum,
        };
    },
});
