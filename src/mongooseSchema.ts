import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from './types';
import 'dotenv/config';
import { baseSchema } from '../../debate-zone-micro-service-common-library/src/mongoose/baseSchema';
import { PoliticalPreferenceEnum } from './utils/enums/PoliticalPreferenceEnum';
import { TokenProviderEnum } from './utils/enums/TokenProviderEnum';

export type UserDocument = Document & User;

export const userMongooseSchema: mongoose.Schema = baseSchema.add({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    token: {
        accessToken: {
            type: String,
            required: false,
        },
        accessTokenExpiresAt: {
            type: Number,
            required: false,
        },
        refreshToken: {
            type: String,
            required: false,
        },
        refreshTokenExpiresAt: {
            type: Number,
            required: false,
        },
        provider: {
            type: String,
            enum: Object.values(TokenProviderEnum),
            required: false,
        },
    },
    politicalPreference: {
        type: String,
        enum: Object.values(PoliticalPreferenceEnum),
    },
});

userMongooseSchema.index(
    {
        email: 1,
    },
    {
        unique: true,
    },
);

export const userModel = mongoose.model<UserDocument>(
    process.env.MONGO_DB_NAME!,
    userMongooseSchema,
);
