import {
    LoginCredentialsUser,
    OutputDecodedToken,
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
import 'dotenv/config';
import { Role } from '../../../../debate-zone-micro-service-common-library/src/types/user';

const crypto = require('crypto');

export type JWT = {
    email?: string;
    role?: Role;
    userId?: string;
    fullName?: string;
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
            role: jwtPayload.role,
            userId: jwtPayload.userId,
            fullName: jwtPayload.fullName,
        } as AuthDecoded;
    }
}

export const authCredentialsService = new AuthCredentialsService();

export const loginWithCredentials = async (
    loginCredentialsUser: LoginCredentialsUser,
): Promise<OutputLoginCredentialsUser> => {
    const user = await validateCredentials(loginCredentialsUser);

    const jwtPayload: JWT = {
        ...user,
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
    fullName: string;
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
        fullName: existUser.firstName + ' ' + existUser.secondName,
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
    const firstName: string | undefined = parseFirstAndSecondNameFromEmail(
        input.email,
    )[0];
    const secondName: string | undefined = parseFirstAndSecondNameFromEmail(
        input.email,
    )[1];

    const user: User | null = await userDbController.create({
        email: input.email,
        password: hashedPassword,
        firstName: firstName,
        secondName: secondName,
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

const parseFirstAndSecondNameFromEmail = (email: string): string[] => {
    let firstAndLastName = email.split('@')[0].split('.');

    firstAndLastName = firstAndLastName.map(name => {
        if (name.length) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        } else {
            return '';
        }
    });

    if (firstAndLastName.length === 1) {
        firstAndLastName.push('');
    }

    return firstAndLastName;
};

export const decodeToken = async (
    token: string,
): Promise<OutputDecodedToken> => {
    const decodedToken = await authCredentialsService.decodeToken(token);

    return {
        userEmail: decodedToken.email,
        userRole: decodedToken.role,
        userId: decodedToken.userId,
        userFullName: decodedToken.fullName,
    } as OutputDecodedToken;
};
