import { BaseDbController } from '../../debate-zone-micro-service-common-library/src/mongoose/baseDbController';
import { User } from './types/userTypes';
import { userModel } from './mongooseSchemas/userMongooseSchema';

class UserDbController extends BaseDbController<User> {}

export const userDbController = new UserDbController(userModel);
