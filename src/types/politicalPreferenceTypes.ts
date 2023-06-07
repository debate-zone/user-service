import { z } from 'zod';
import { politicalPreferenceHistorySchema } from '../zodSchemas/politicalPreferenceHisotryZodSchema';
import {
    politicalPreferenceListSchema,
    politicalPreferenceSchema,
} from '../zodSchemas/userZodSchema';

export type PoliticalPreferenceHistory = z.infer<
    typeof politicalPreferenceHistorySchema
>;

export type PoliticalPreference = z.infer<typeof politicalPreferenceSchema>;

export type PoliticalPreferenceList = z.infer<
    typeof politicalPreferenceListSchema
>;
