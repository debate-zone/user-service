import { JwtPayload } from 'jsonwebtoken';
import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';
import { decode } from './authDecoder';
import { validateCredentials } from './authCredentialsService';
import { createHttpError } from 'express-zod-api';
import { LoginUser, OutputLoginUser, RegisterUser, User } from '../../types';
import { userDbController } from '../../dbController';
import bcrypt from 'bcrypt';

export const login = async (
    input: LoginUser,
    options: { token: string },
): Promise<OutputLoginUser> => {
    let decodedToken: JwtPayload = {} as JwtPayload;

    switch (input.provider) {
        case TokenProviderEnum.APPLE:
        case TokenProviderEnum.GOOGLE:
        case TokenProviderEnum.FACEBOOK:
            decodedToken = decode(options.token, input.provider);
            break;
        case TokenProviderEnum.CREDENTIALS:
            if (!input.email || !input.password) {
                throw createHttpError(400, 'Email and password are required');
            }
            decodedToken = await validateCredentials({
                email: input.email,
                password: input.password,
            });
            break;
        default:
            throw createHttpError(501, 'Not implemented');
    }

    const user: User | null = await userDbController.save(
        {
            email: decodedToken.email,
        },
        {
            token: {
                accessToken: decodedToken?.accessToken,
                accessTokenExpiresAt: decodedToken?.accessTokenExpiresAt,
                refreshToken: decodedToken?.refreshToken,
                refreshTokenExpiresAt: decodedToken?.refreshTokenExpiresAt,
            },
        },
    );

    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    return user;
};

export const register = async (input: RegisterUser): Promise<User> => {
    const saltRounds = 10;

    const hashedPassword = bcrypt.hashSync(input.password, saltRounds);

    const existUser = await userDbController.findOne({
        email: input.email,
    });

    if (existUser) {
        throw createHttpError(400, 'User already exists');
    }

    const user: User | null = await userDbController.save(
        {},
        {
            email: input.email,
            password: hashedPassword,
        },
    );

    if (!user) {
        throw createHttpError(500, 'Internal error');
    } else {
        return user;
    }
};
