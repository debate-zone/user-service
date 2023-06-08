import { AuthDecoder } from '../../interfaces';
import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';
import axios, { AxiosInstance } from 'axios';
import { AuthDecoded } from './authDecoder';

class AuthGoogleService implements AuthDecoder {
    readonly provider: TokenProviderEnum = TokenProviderEnum.GOOGLE;

    private googleAuthAxiosInstance: AxiosInstance;

    constructor() {
        this.googleAuthAxiosInstance = axios.create({
            baseURL: 'https://www.googleapis.com',
        });
    }

    async decodeToken(token: string): Promise<AuthDecoded> {
        const response = await this.googleAuthAxiosInstance.get<{
            verified_email: boolean;
            email: string;
            given_name: string;
            family_name: string;
            picture: string;
            locale: string;
            hd: string;
            en: string;
        }>('/userinfo/v2/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            verifiedEmail: response.data.verified_email,
            email: response.data.email,
            firstName: response.data.given_name,
            secondName: response.data.family_name,
            picture: response.data.picture,
            locale: response.data.en,
            company: response.data.hd,
        };
    }
}

export const authGoogleService = new AuthGoogleService();
