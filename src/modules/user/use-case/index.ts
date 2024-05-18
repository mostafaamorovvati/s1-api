import { DeleteUserUseCase } from '@/modules/user/use-case/delete-user.use-case';
import { FindUserByEmailUseCase } from '@/modules/user/use-case/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '@/modules/user/use-case/find-user-by-id.use-case';
import { FindUsersByRoleUseCase } from '@/modules/user/use-case/find-users-by-role.use-case';
import { SearchUserUseCase } from '@/modules/user/use-case/search-user.use-case';
import { UpdateUserUseCase } from '@/modules/user/use-case/update-user.use-case';

import { CreateUserUseCase } from './create-user.use-case';
import { FindUserByPhoneOrEmailAndIsVerifiedUseCase } from './find-user-by-phone-or-email-and-is-verified.use-case';

export const UseCases = [
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  SearchUserUseCase,
  FindUserByIdUseCase,
  FindUserByEmailUseCase,
  FindUserByPhoneOrEmailAndIsVerifiedUseCase,
  FindUsersByRoleUseCase,
];
