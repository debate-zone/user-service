import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';
import { AuthDecoded, decode } from './authDecoder';
import { createHttpError } from 'express-zod-api';
import { LoginUser, OutputLoginUser, User } from '../../types';
import { userDbController } from '../../dbController';

export const login = async (
    input: LoginUser,
    options: { token: string; provider: TokenProviderEnum },
): Promise<OutputLoginUser> => {
    let decodedToken: AuthDecoded = {} as AuthDecoded;

    switch (options.provider) {
        case TokenProviderEnum.APPLE:
        case TokenProviderEnum.GOOGLE:
        case TokenProviderEnum.FACEBOOK:
        case TokenProviderEnum.CREDENTIALS:
            decodedToken = await decode(options.token, options.provider);
            break;
        default:
            throw createHttpError(501, 'Not implemented');
    }

    const user: User | null = await userDbController.save(
        {
            email: decodedToken.email,
        },
        {
            email: decodedToken.email,
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

    return {
        email: user.email,
        politicalPreference: user.politicalPreference,
    };
};
