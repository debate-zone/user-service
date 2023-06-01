import { baseSchema } from '../../../debate-zone-micro-service-common-library/src/mongoose/baseSchema';
import { CollectionsEnum } from '../../../debate-zone-micro-service-common-library/src/enums/collectionsEnum';
import { PoliticalPreferenceHistory } from '../types/politicalPreferenceTypes';
import * as mongoose from 'mongoose';
import { PoliticalPreferenceEnum } from '../utils/enums/PoliticalPreferenceEnum';
import { Types } from 'mongoose';
import { ActionEnum } from '../utils/enums/ActionEnum';

export type PoliticalPreferenceHistoryDocument = Document &
    PoliticalPreferenceHistory;

export const politicalPreferenceHistoryMongooseSchema: mongoose.Schema =
    baseSchema.add({
        userId: {
            type: Types.ObjectId,
            ref: CollectionsEnum.USER,
            required: true,
        },
        debateZoneId: {
            type: Types.ObjectId,
            ref: CollectionsEnum.DEBATE_ZONE,
            required: true,
        },
        politicalPreference: {
            type: String,
            enum: Object.values(PoliticalPreferenceEnum),
            required: true,
        },
        action: {
            type: String,
            enum: Object.values(ActionEnum),
            required: true,
        },
    });

export const politicalPreferenceHistoryModel =
    mongoose.model<PoliticalPreferenceHistoryDocument>(
        CollectionsEnum.POLITICAL_PREFERENCE_HISTORY,
        politicalPreferenceHistoryMongooseSchema,
    );
