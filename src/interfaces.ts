import { TokenProviderEnum } from './utils/enums/TokenProviderEnum';
import { AuthDecoded } from './services/auth/authDecoder';

export interface AuthDecoder {
    readonly provider: TokenProviderEnum;

    decodeToken(token: string): Promise<AuthDecoded>;
}
