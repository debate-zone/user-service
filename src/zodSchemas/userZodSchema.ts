import { z } from 'zod';
import { baseZodSchema } from '../../../debate-zone-micro-service-common-library/src/zod/baseZodSchema';
import { PoliticalPreferenceEnum } from '../utils/enums/PoliticalPreferenceEnum';
import { TokenProviderEnum } from '../utils/enums/TokenProviderEnum';

const emailSchema = z.string().email().min(5).max(50);
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

export const userSchema = baseZodSchema
    .merge(baseCredentialsUserSchema)
    .extend({
        token: tokenSchema.optional(),
        politicalPreference: z.nativeEnum(PoliticalPreferenceEnum).optional(),
    })
    .strict();

export const newUserSchema = userSchema.deepPartial();
export const outputNewUserSchema = userSchema.deepPartial();

export const updateUserSchema = userSchema
    .pick({
        politicalPreference: true,
    })
    .strict();

export const loginUserSchema = z.object({
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
    provider: z.nativeEnum(TokenProviderEnum).optional(),
});

export const outputLoginUserSchema = userSchema.pick({
    email: true,
    politicalPreference: true,
});

export const registerUserSchema = baseCredentialsUserSchema.extend({});
export const outputRegisterSchema = z.object({
    accessToken: z.string(),
});

export const loginCredentialsUserSchema = baseCredentialsUserSchema.extend({});

export const outputLoginCredentialsUserSchema = z.object({
    accessToken: z.string(),
});
