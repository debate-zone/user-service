import { defaultEndpointsFactory } from 'express-zod-api';
import {
    inputUserEmailByIdSchema,
    newUserSchema,
    outputNewUserSchema,
    outputUserEmailByIdSchema,
    updateUserSchema,
} from '../zodSchemas/userZodSchema';
import { authMiddleware } from '../middlewares';
import { getUserEmailById, save, update } from '../services/user/userService';

export const newUserEndpoint = defaultEndpointsFactory.build({
    shortDescription: 'Create a new user',
    description: 'Create a new user',
    method: 'post',
    input: newUserSchema,
    output: outputNewUserSchema,
    handler: async ({ input, options, logger }): Promise<{}> => {
        logger.info('Creating new user', input);
        return await save(input);
    },
});

export const updateUserEndpoint = defaultEndpointsFactory
    .addMiddleware(authMiddleware)
    .build({
        shortDescription: 'Update user',
        description: 'Update user',
        method: 'put',
        input: updateUserSchema,
        output: outputNewUserSchema,
        handler: async ({ input, options, logger }): Promise<{}> => {
            logger.info('Update user', input);

            return await update(input, {
                email: options.loggedUser.email!,
            });
        },
    });

export const getUserEmailByIdEndpoint = defaultEndpointsFactory.build({
    shortDescription: 'Get user email by id',
    description: 'Get user email by id',
    method: 'get',
    input: inputUserEmailByIdSchema,
    output: outputUserEmailByIdSchema,
    handler: async ({ input, options, logger }) => {
        logger.info('Get user email by id', input);

        return await getUserEmailById(input.userId);
    },
});
