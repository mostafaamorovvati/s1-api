import { BulkDeletePermissionUseCase } from '@/modules/auth/components/permission/use-case/bulk-delete-permission.use-case';
import { CreatePermissionUseCase } from '@/modules/auth/components/permission/use-case/create-permission.use-case';
import { DeletePermissionUseCase } from '@/modules/auth/components/permission/use-case/delete-permission.use-case';
import { FindPermissionByIdUseCase } from '@/modules/auth/components/permission/use-case/find-permission-by-id.use-case';
import { FindPermissionByIdsUseCase } from '@/modules/auth/components/permission/use-case/find-permission-by-ids.use-case';
import { SearchPermissionUseCase } from '@/modules/auth/components/permission/use-case/search-permission.use-case';
import { UpdatePermissionUseCase } from '@/modules/auth/components/permission/use-case/update-permission.use-case';

export const UseCases = [
  CreatePermissionUseCase,
  UpdatePermissionUseCase,
  DeletePermissionUseCase,
  SearchPermissionUseCase,
  FindPermissionByIdUseCase,
  FindPermissionByIdsUseCase,
  BulkDeletePermissionUseCase,
];
