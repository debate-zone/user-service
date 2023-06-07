import { defaultEndpointsFactory } from 'express-zod-api';
import { z } from 'zod';
import { politicalPreferenceListSchema } from '../zodSchemas/userZodSchema';
import { getPoliticalPreferences } from '../services/user/userPoliticalPreferenceService';
import { PoliticalPreferenceList } from '../types/politicalPreferenceTypes';

export const politicalPreferenceListEndpoint = defaultEndpointsFactory.build({
    shortDescription: 'List political preferences',
    description: 'List political preferences',
    method: 'get',
    input: z.object({}),
    output: politicalPreferenceListSchema,
    handler: async ({
        input,
        options,
        logger,
    }): Promise<PoliticalPreferenceList> => {
        return getPoliticalPreferences();
    },
});
