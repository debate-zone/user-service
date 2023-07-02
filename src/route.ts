import { Routing } from 'express-zod-api';
import {
    getUserEmailByIdEndpoint,
    newUserEndpoint,
    updateUserEndpoint,
} from './endpoints/userEndpoint';
import {
    loginRoute as login,
    registerRoute as register,
    loginWithCredentialsRoute,
    decodeTokenRoute,
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
            email: getUserEmailByIdEndpoint,
        },
        auth: {
            login,
            'login-with-credentials': loginWithCredentialsRoute,
            register,
            verify: decodeTokenRoute,
        },
    },
};
