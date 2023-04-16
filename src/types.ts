import { userSchema} from "./zodSchema"
import {z} from "zod"

export type User = z.infer<typeof userSchema>
