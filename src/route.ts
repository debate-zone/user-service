import { Routing } from 'express-zod-api';
import { newUserEndpoint, updateUserEndpoint } from './endpoints/userEndpoint';
import {
    loginRoute as login,
    registerRoute as register,
    loginWithCredentialsRoute,
} from './endpoints/authEndpoint';
import { politicalPreferenceListEndpoint } from './endpoints/userPoliticalPreferenceEndpoint';

export const routing: Routing = {
    v1: {
        users: {
            new: newUserEndpoint,
            update: updateUserEndpoint,
            'political-preferences': {
                list: politicalPreferenceListEndpoint,
            },
        },
        auth: {
            login,
            'login-with-credentials': loginWithCredentialsRoute,
            register,
        },
    },
};
