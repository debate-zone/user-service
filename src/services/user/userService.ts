import { NewUser, User } from '../../types';
import { userDbController } from '../../dbController';
import { createHttpError } from 'express-zod-api';

export async function save(input: NewUser, options?: { email: string }) {
    const user: User | null = await userDbController.save(
        {
            email: options?.email || input.email,
        },
        input,
    );

    if (!user) {
        throw createHttpError(500, 'Internal error');
    } else {
        return user;
    }
}
