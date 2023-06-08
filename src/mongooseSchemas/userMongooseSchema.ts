import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../types/userTypes';
import 'dotenv/config';
import { baseSchema } from '../../../debate-zone-micro-service-common-library/src/mongoose/baseSchema';
import { CollectionsEnum } from '../../../debate-zone-micro-service-common-library/src/enums/collectionsEnum';
import { PoliticalPreferenceEnum } from '../utils/enums/PoliticalPreferenceEnum';
import { TokenProviderEnum } from '../utils/enums/TokenProviderEnum';
import { Role } from '../utils/enums/Role';

export type UserDocument = Document & User;

export const userMongooseSchema: mongoose.Schema = baseSchema.add({
    firstName: {
        type: String,
        required: false,
    },
    secondName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: function () {
            // @ts-ignore
            return !this.phoneNumber;
        },
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
        code: {
            type: String,
            enum: Object.values(PoliticalPreferenceEnum),
        },
        x: {
            type: Number,
        },
        y: {
            type: Number,
        },
    },
    role: {
        type: String,
        enum: Object.values(Role),
    },
    phoneNumber: {
        type: String,
        required: function () {
            // @ts-ignore
            return !this.email;
        },
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
    CollectionsEnum.USER,
    userMongooseSchema,
);
