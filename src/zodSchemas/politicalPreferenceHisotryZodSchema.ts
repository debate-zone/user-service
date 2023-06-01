import { z } from 'zod';
import { baseZodSchema } from '../../../debate-zone-micro-service-common-library/src/zod/baseZodSchema';
import { PoliticalPreferenceEnum } from '../utils/enums/PoliticalPreferenceEnum';
import { ActionEnum } from '../utils/enums/ActionEnum';

export const politicalPreferenceHistorySchema = baseZodSchema.extend({
    userId: z.string(),
    debateZoneId: z.string(),
    politicalPreference: z.nativeEnum(PoliticalPreferenceEnum),
    action: z.nativeEnum(ActionEnum),
});
