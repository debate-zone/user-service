import { BaseDbController } from '../../debate-zone-micro-service-common-library/src/mongoose/baseDbController';
import { User } from './types';
import { userModel } from './mongooseSchema';

class UserDbController extends BaseDbController<User> {}

export const userDbController = new UserDbController(userModel);
