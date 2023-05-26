import { LoginCredentialsUser, User } from '../../types';
import { userDbController } from '../../dbController';
import bcrypt from 'bcrypt';
import { createHttpError } from 'express-zod-api';

export const validateCredentials = async (
    loginCredentialsUser: LoginCredentialsUser,
): Promise<{
    email: string;
}> => {
    const existUser: User | null = await userDbController.findOne({
        email: loginCredentialsUser.email,
    });

    if (!existUser) {
        throw createHttpError(
            401,
            `Can't found user with this email "${loginCredentialsUser.email}"`,
        );
    } else if (existUser.password) {
        const isPasswordValid: boolean = await bcrypt.compare(
            loginCredentialsUser.password,
            existUser.password,
        );
        if (!isPasswordValid) {
            throw createHttpError(401, 'Invalid password');
        }
    } else {
        throw createHttpError(401, 'You must set a password');
    }

    return {
        email: existUser.email,
    };
};
