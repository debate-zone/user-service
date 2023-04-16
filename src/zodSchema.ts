import {z} from "zod"
import {baseZodSchema} from "../../debate-zone-micro-service-common-library/src/zod/baseZodSchema"

export const userSchema = baseZodSchema.extend({
    email: z.string().email(),
}).strict()


export const newUserSchema = userSchema.deepPartial()

export const outputSchema = z.object({})
