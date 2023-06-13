import {
    LoginCredentialsUser,
    OutputLoginCredentialsUser,
    OutputRegister,
    RegisterUser,
    User,
} from '../../types/userTypes';
import { userDbController } from '../../dbController';
import * as bcrypt from 'bcrypt';
import { createHttpError } from 'express-zod-api';
import { AuthDecoder } from '../../interfaces';
import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';
import { AuthDecoded } from './authDecoder';
import { sign, verify } from 'jsonwebtoken';
const crypto = require('crypto');
import 'dotenv/config';
import { Role } from '../../utils/enums/Role';

export type JWT = {
    email?: string;
    userId?: string;
};
class AuthCredentialsService implements AuthDecoder {
    readonly provider: TokenProviderEnum = TokenProviderEnum.CREDENTIALS;

    async decodeToken(token: string): Promise<AuthDecoded> {
        let jwtPayload: JWT | undefined;
        try {
            jwtPayload = verify(token, getJwtSecret()) as JWT;
        } catch (error) {
            throw createHttpError(401, 'Invalid token');
        }

        return {
            email: jwtPayload.email,
        } as AuthDecoded;
    }
}

export const authCredentialsService = new AuthCredentialsService();

export const loginWithCredentials = async (
    loginCredentialsUser: LoginCredentialsUser,
): Promise<OutputLoginCredentialsUser> => {
    const user = await validateCredentials(loginCredentialsUser);

    const jwtPayload: JWT = {
        userId: user.userId,
        email: user.email,
    };

    const accessToken = sign(jwtPayload, getJwtSecret(), {
        expiresIn: '1d',
    });

    return {
        accessToken: accessToken,
    } as OutputLoginCredentialsUser;
};

const getJwtSecret = (): string => {
    if (!process.env.JWT_SECRET) {
        throw createHttpError(500, 'Env variable JWT_SECRET not found');
    }
    return crypto
        .createHash('sha256')
        .update(process.env.JWT_SECRET)
        .digest('hex');
};

export const validateCredentials = async (
    loginCredentialsUser: LoginCredentialsUser,
): Promise<{
    userId: string;
    role?: Role;
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
        userId: existUser._id,
        role: existUser.role,
        email: existUser.email!,
    };
};

export const register = async (
    input: RegisterUser,
): Promise<OutputRegister> => {
    const saltRounds = 10;

    const existUser = await userDbController.findOne({
        email: input.email,
    });

    if (existUser) {
        throw createHttpError(400, 'User already exists');
    }

    const hashedPassword = bcrypt.hashSync(input.password, saltRounds);

    const user: User | null = await userDbController.create({
        email: input.email,
        password: hashedPassword,
    });

    if (!user) {
        throw createHttpError(500, 'Internal error');
    } else {
        const outputLoginCredentialsUser: OutputLoginCredentialsUser =
            await loginWithCredentials({
                email: input.email,
                password: input.password,
            });

        return {
            accessToken: outputLoginCredentialsUser.accessToken,
        } as OutputRegister;
    }
};
