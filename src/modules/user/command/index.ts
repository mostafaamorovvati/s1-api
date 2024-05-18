import { CreateUserHandler } from '@/modules/user/command/create-user';
import { DeleteUserHandler } from '@/modules/user/command/delete-user/delete-user.handler';
import { RemoveRoleFromUsersHandler } from '@/modules/user/command/remove-role-from-users/remove-role-from-users.handler';
import { UpdateUserHandler } from '@/modules/user/command/update-user/update-user.handler';

import { CreateUserWithPhoneHandler } from './create-user-with-phone/create-user-with-phone.handler';
import { UpdatePasswordHandler } from './update-password/update-password.handler';
import { CreateUserWithgoogleHandler } from './create-user-with-google/create-user-with-google.handler';

export const CommandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
  UpdatePasswordHandler,
  CreateUserWithPhoneHandler,
  RemoveRoleFromUsersHandler,
  CreateUserWithgoogleHandler,
];
