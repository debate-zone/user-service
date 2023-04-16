import {defaultEndpointsFactory} from "express-zod-api"
import {newUserSchema, outputSchema} from "./zodSchema"
import {userDbController} from "./dbController";

export const newUser = defaultEndpointsFactory.build({
    method: "post",
    input: newUserSchema,
    output: outputSchema,
    handler: async ({ input, options, logger }): Promise<{}> => {
        logger.debug("Options:", options)

        await userDbController.save(input)
        return {}
    }
})
