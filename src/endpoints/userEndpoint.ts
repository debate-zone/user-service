import { defaultEndpointsFactory } from 'express-zod-api';
import {
    newUserSchema,
    outputNewUserSchema,
    updateUserSchema,
} from '../zodSchemas/userZodSchema';
import { authMiddleware } from '../middlewares';
import { save } from '../services/user/userService';

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
        method: 'post',
        input: updateUserSchema,
        output: outputNewUserSchema,
        handler: async ({ input, options, logger }): Promise<{}> => {
            logger.info('Update user', input);

            return await save(input, {
                email: options.loggedUser.email!,
            });
        },
    });
