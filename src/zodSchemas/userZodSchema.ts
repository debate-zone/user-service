import { z } from 'zod';
import {
    baseZodSchema,
    phoneNumberSchema,
} from '../../../debate-zone-micro-service-common-library/src/zod/baseZodSchema';
import { PoliticalPreferenceEnum } from '../utils/enums/PoliticalPreferenceEnum';
import { TokenProviderEnum } from '../utils/enums/TokenProviderEnum';
import { Role } from '../utils/enums/Role';

const emailSchema = z.string().email().min(5).max(50).toLowerCase();
const passwordSchema = z.string().min(8).max(20);

const baseCredentialsUserSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const tokenSchema = z.object({
    accessToken: z.string().optional(),
    accessTokenExpiresAt: z.number().optional(),
    refreshToken: z.string().optional(),
    refreshTokenExpiresAt: z.number().optional(),
    provider: z.nativeEnum(TokenProviderEnum).optional(),
});

export const politicalPreferenceSchema = z.object({
    code: z.nativeEnum(PoliticalPreferenceEnum),
    x: z.number(),
    y: z.number(),
});

export const politicalPreferenceListSchema = z.object({
    politicalPreferences: z.array(politicalPreferenceSchema),
});

export const userSchema = baseZodSchema
    .merge(
        baseCredentialsUserSchema.omit({
            email: true,
        }),
    )
    .extend({
        image: z.string().url().optional(),
        firstName: z.string().min(2).max(50).optional(),
        secondName: z.string().min(2).max(50).optional(),
        email: emailSchema.optional(),
        token: tokenSchema.optional(),
        politicalPreference: politicalPreferenceSchema.partial().optional(),
        role: z.nativeEnum(Role).default(Role.USER).optional(),
        phoneNumber: phoneNumberSchema.optional(),
    })
    .strict();

export const newUserSchema = userSchema.deepPartial();
export const outputNewUserSchema = userSchema
    .omit({
        password: true,
    })
    .deepPartial();

export const updateUserSchema = z
    .object({
        fullName: z.string().max(100).optional(),
        politicalPreference: z.nativeEnum(PoliticalPreferenceEnum).optional(),
    })
    .strict();

export const loginUserSchema = z.object({
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
    provider: z.nativeEnum(TokenProviderEnum).optional(),
});

export const outputLoginUserSchema = userSchema.pick({
    _id: true,
    firstName: true,
    secondName: true,
    email: true,
    politicalPreference: true,
    role: true,
    image: true,
});

export const registerUserSchema = baseCredentialsUserSchema.extend({});
export const outputRegisterSchema = z.object({
    accessToken: z.string(),
});

export const loginCredentialsUserSchema = baseCredentialsUserSchema.extend({});

export const outputLoginCredentialsUserSchema = z.object({
    accessToken: z.string(),
});
