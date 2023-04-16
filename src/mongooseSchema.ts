import * as mongoose from "mongoose"
import {Document} from "mongoose"
import { User } from "./types"
import 'dotenv/config'
import {baseSchema} from "../../debate-zone-micro-service-common-library/src/mongoose/baseSchema"

export type UserDocument = Document & User

export const userMongooseSchema: mongoose.Schema = baseSchema.add({
    email: {
        type: String,
        required: true
    },
})

userMongooseSchema.index({
    email: 1
}, {
    unique: true
})

export const userModel = mongoose.model<UserDocument>(process.env.MONGO_DB_NAME!, userMongooseSchema)
