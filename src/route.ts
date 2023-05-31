import { Routing } from 'express-zod-api';
import {
    newUserEndpoint as newUser,
    updateUserEndpoint as updateUser,
} from './endpoints/userEndpoint';
import {
    loginRoute as login,
    registerRoute as register,
    loginWithCredentialsRoute as loginWithCredentials,
} from './endpoints/authEndpoint';

export const routing: Routing = {
    v1: {
        users: {
            newUser,
            updateUser,
        },
        auth: {
            login,
            'login-with-credentials': loginWithCredentials,
            register,
        },
    },
};
