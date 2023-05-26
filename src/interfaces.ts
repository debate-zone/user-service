import { JwtPayload } from 'jsonwebtoken';
import { TokenProviderEnum } from './utils/enums/TokenProviderEnum';

export interface AuthDecoder {
    readonly provider: TokenProviderEnum;

    decodeToken(token: string): JwtPayload;
}
