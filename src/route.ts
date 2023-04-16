import {Routing} from "express-zod-api"
import {newUser} from "./endpoint"

export const routing: Routing = {
    v1: {
        users: newUser,
    }
}
