import { AuthDecoder } from '../../interfaces';
import { authAppleService } from './authAppleService';
import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';
import { authGoogleService } from './authGoogleService';
import { JwtPayload } from 'jsonwebtoken';
import { authFacebookService } from './authFacebookService';

export interface AuthDecoded extends JwtPayload {
    verifiedEmail?: boolean;
    email: string;
    firstName?: string;
    secondName?: string;
    picture?: string;
    locale?: string;
    company?: string;
}

const authDecoders: AuthDecoder[] = [
    authAppleService,
    authGoogleService,
    authFacebookService,
];

export const decode = async (
    token: string,
    provider: TokenProviderEnum,
): Promise<AuthDecoded> => {
    const authDecoder = authDecoders.find(
        authDecoder => authDecoder.provider === provider,
    );

    if (!authDecoder) {
        throw new Error(`No auth decoder for provider ${provider}`);
    }
    return await authDecoder.decodeToken(token);
};
