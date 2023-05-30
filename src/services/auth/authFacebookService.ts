import { AuthDecoder } from '../../interfaces';
import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';
import axios, { AxiosInstance } from 'axios';
import { AuthDecoded } from './authDecoder';

export type Me = {
    id: string;
    name: string;
};

export type Details = {
    email: string;
    picture: {
        data: {
            url: string;
        };
    };
    first_name: string;
    last_name: string;
};

class AuthFacebookService implements AuthDecoder {
    readonly provider: TokenProviderEnum = TokenProviderEnum.FACEBOOK;

    private facebookAuthAxiosInstance: AxiosInstance;

    constructor() {
        this.facebookAuthAxiosInstance = axios.create({
            baseURL: 'https://graph.facebook.com',
        });
    }
    async decodeToken(token: string): Promise<AuthDecoded> {
        const me = await this.me(token);
        const details = await this.details(me.id, token);

        return {
            email: details.email,
            firstName: details.first_name,
            secondName: details.last_name,
            picture: details.picture.data.url,
        } as AuthDecoded;
    }

    private async me(token: string): Promise<Me> {
        const response = await this.facebookAuthAxiosInstance.get('/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }

    private async details(userId: string, token: string): Promise<Details> {
        const response = await this.facebookAuthAxiosInstance.get(
            `/${userId}?fields=email,picture`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    }
}

export const authFacebookService = new AuthFacebookService();
