import {defaultEndpointsFactory} from "express-zod-api"
import {newUserSchema, outputSchema} from "./zodSchema"
import {userDbController} from "./dbController";

export const newUser = defaultEndpointsFactory.build({
    shortDescription: "Create a new user",
    description: "Create a new user",
    method: "post",
    input: newUserSchema,
    output: outputSchema,
    handler: async ({ input, options, logger }): Promise<{}> => {
        logger.info("Creating new user", input)

        await userDbController.save({
            email: input.email
        }, input)

        return {}
    }
})
