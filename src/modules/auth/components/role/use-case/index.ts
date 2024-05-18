import { BulkDeleteRoleUseCase } from '@/modules/auth/components/role/use-case/bulk-delete-role.user-case';
import { CreateRoleUseCase } from '@/modules/auth/components/role/use-case/create-role.use-case';
import { DeleteRoleUseCase } from '@/modules/auth/components/role/use-case/delete-role.use-case';
import { FindRoleByIdUseCase } from '@/modules/auth/components/role/use-case/find-role-by-id.use-case';
import { FindRoleByIdsUseCase } from '@/modules/auth/components/role/use-case/find-role-by-ids.use-case';
import { FindRoleByNameUseCase } from '@/modules/auth/components/role/use-case/find-role-by-name.use-case';
import { SearchRoleUseCase } from '@/modules/auth/components/role/use-case/search-role.use-case';
import { UpdateRoleUseCase } from '@/modules/auth/components/role/use-case/update-role.use-case';

export const UseCases = [
  CreateRoleUseCase,
  UpdateRoleUseCase,
  DeleteRoleUseCase,
  SearchRoleUseCase,
  FindRoleByIdUseCase,
  FindRoleByIdsUseCase,
  FindRoleByNameUseCase,
  BulkDeleteRoleUseCase,
];
