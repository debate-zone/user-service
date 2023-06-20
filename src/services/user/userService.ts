import { NewUser, UpdateUser, User } from '../../types/userTypes';
import { userDbController } from '../../dbController';
import { createHttpError } from 'express-zod-api';
import { getPoliticalPreferences } from './userPoliticalPreferenceService';
import { PoliticalPreference } from '../../types/politicalPreferenceTypes';

export async function save(input: NewUser, options?: { email: string }) {
    const user: User | null = await userDbController.save(
        {
            email: options?.email || input.email,
        },
        input,
    );

    if (!user) {
        throw createHttpError(500, 'Internal error');
    } else {
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}

export async function update(
    updateUser: UpdateUser,
    options?: { email: string },
) {
    const politicalPreference: PoliticalPreference | undefined =
        getPoliticalPreferences().politicalPreferences.find(
            politicalPreference =>
                politicalPreference.code === updateUser.politicalPreference,
        );

    const userToUpdate: User = {
        politicalPreference,
        firstName: updateUser.fullName?.split(' ')[0],
        secondName: updateUser.fullName?.split(' ')[1],
    } as User;

    const user: User | null = await userDbController.save(
        {
            email: options?.email,
        },
        {
            ...userToUpdate,
        },
    );

    if (!user) {
        throw createHttpError(500, 'Internal error');
    } else {
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}

export async function getUserEmailById(userId: string) {
    const user: User | null = await userDbController.findOne({
        _id: userId,
    });

    if (!user) {
        throw createHttpError(500, 'Internal error');
    } else {
        return {
            email: user.email!,
        };
    }
}
