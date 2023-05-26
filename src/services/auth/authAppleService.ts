import axios, { AxiosInstance } from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createHttpError } from 'express-zod-api';
import 'dotenv/config';
import { AuthDecoder } from '../../interfaces';
import { TokenProviderEnum } from '../../utils/enums/TokenProviderEnum';

class AuthAppleService implements AuthDecoder {
    readonly provider: TokenProviderEnum = TokenProviderEnum.APPLE;

    private appleAuthAxiosInstance: AxiosInstance;

    constructor() {
        this.appleAuthAxiosInstance = axios.create({
            baseURL: 'https://appleid.apple.com',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    }

    async getAppleToken(code: string) {
        const response = await this.appleAuthAxiosInstance.post('/auth/token', {
            client_id: process.env.APPLE_CLIENT_ID,
            client_secret: process.env.APPLE_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.APPLE_REDIRECT_URI,
            scope: 'name email',
        });
        return response.data;
    }

    decodeToken(token: string): JwtPayload {
        const decodedToken: JwtPayload | string | null = jwt.decode(token);

        if (!decodedToken || typeof decodedToken === 'string') {
            throw createHttpError(401, 'Invalid token');
        } else {
            return decodedToken;
        }
    }
}

export const authAppleService = new AuthAppleService();
