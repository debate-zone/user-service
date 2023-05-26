import { AuthDecoder } from '../../interfaces';
import { authAppleService } from './authAppleService';
import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';

const authDecoders = Array.of(authAppleService) as AuthDecoder[];
export const decode = (token: string, provider: TokenProviderEnum) => {
    const authDecoder = authDecoders.find(
        authDecoder => authDecoder.provider === provider,
    );
    if (!authDecoder) {
        throw new Error(`No auth decoder for provider ${provider}`);
    }
    return authDecoder.decodeToken(token);
};
