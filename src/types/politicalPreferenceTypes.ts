import { z } from 'zod';
import { politicalPreferenceHistorySchema } from '../zodSchemas/politicalPreferenceHisotryZodSchema';

export type PoliticalPreferenceHistory = z.infer<
    typeof politicalPreferenceHistorySchema
>;
