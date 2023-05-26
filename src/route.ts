import { Routing } from 'express-zod-api';
import {
    newUserEndpoint as newUser,
    updateUserEndpoint as updateUser,
} from './endpoints/userEndpoint';
import {
    loginRoute as login,
    registerRoute as register,
} from './endpoints/authEndpoint';

export const routing: Routing = {
    v1: {
        users: {
            newUser,
            updateUser,
        },
        auth: {
            login,
            register,
        },
    },
};
