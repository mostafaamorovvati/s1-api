import { Args, ResolveField, Resolver } from '@nestjs/graphql';

import {
  CreatePermissionInput,
  CreatePermissionOutput,
} from '@/modules/auth/components/permission/dto/create-permission.dto';
import {
  BulkDeletePermissionInput,
  DeletePermissionInput,
  DeletePermissionOutput,
} from '@/modules/auth/components/permission/dto/delete-permission.dto';
import {
  FindManyPermissionsOutput,
  FindPermissionByIdInput,
  FindPermissionByIdsInput,
  FindPermissionOutput,
} from '@/modules/auth/components/permission/dto/find-permission.dto';
import {
  PermissionMutation,
  PermissionQuery,
} from '@/modules/auth/components/permission/dto/permission.dto';
import {
  SearchPermissionInput,
  SearchPermissionOutput,
} from '@/modules/auth/components/permission/dto/search-permission.dto';
import {
  UpdatePermissionInput,
  UpdatePermissionOutput,
} from '@/modules/auth/components/permission/dto/update-permission.dto';
import { BulkDeletePermissionUseCase } from '@/modules/auth/components/permission/use-case/bulk-delete-permission.use-case';
import { CreatePermissionUseCase } from '@/modules/auth/components/permission/use-case/create-permission.use-case';
import { DeletePermissionUseCase } from '@/modules/auth/components/permission/use-case/delete-permission.use-case';
import { FindPermissionByIdUseCase } from '@/modules/auth/components/permission/use-case/find-permission-by-id.use-case';
import { FindPermissionByIdsUseCase } from '@/modules/auth/components/permission/use-case/find-permission-by-ids.use-case';
import { SearchPermissionUseCase } from '@/modules/auth/components/permission/use-case/search-permission.use-case';
import { UpdatePermissionUseCase } from '@/modules/auth/components/permission/use-case/update-permission.use-case';
import { PanelGuard } from '@/modules/auth/guards/panel.guard';
import { Permission } from '@/common/permissions/permission-type';

@Resolver(() => PermissionQuery)
export class PermissionQueryResolver {
  constructor(
    private readonly searchPermissionUseCase: SearchPermissionUseCase,
    private readonly findPermissionByIdUseCase: FindPermissionByIdUseCase,
    private readonly findPermissionByIdsUseCase: FindPermissionByIdsUseCase,
  ) {}

  @ResolveField(() => FindPermissionOutput)
  async findPermissionById(
    @Args('input') input: FindPermissionByIdInput,
  ): Promise<FindPermissionOutput> {
    return this.findPermissionByIdUseCase.findPermissionByid(input);
  }

  @ResolveField(() => FindManyPermissionsOutput)
  async findPermissionByIds(
    @Args('input') input: FindPermissionByIdsInput,
  ): Promise<FindManyPermissionsOutput> {
    return this.findPermissionByIdsUseCase.findPermissionByids(input);
  }

  @ResolveField(() => SearchPermissionOutput)
  async searchPermissions(
    @Args('input') input: SearchPermissionInput,
  ): Promise<SearchPermissionOutput> {
    return this.searchPermissionUseCase.search(input);
  }
}

@Resolver(() => PermissionMutation)
export class PermissionMutationResolver {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
    private readonly bulkeletePermissionUseCase: BulkDeletePermissionUseCase,
  ) {}

  @ResolveField(() => CreatePermissionOutput)
  @PanelGuard<MethodDecorator>(Permission.CREATE_PERMISSION, Permission.CREATE)
  async createPermission(
    @Args('input') input: CreatePermissionInput,
  ): Promise<CreatePermissionOutput> {
    return this.createPermissionUseCase.createPermission(input);
  }

  @ResolveField(() => UpdatePermissionOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_PERMISSION, Permission.UPDATE)
  async updatePermission(
    @Args('input') input: UpdatePermissionInput,
  ): Promise<UpdatePermissionOutput> {
    return this.updatePermissionUseCase.updatePermission(input);
  }

  @ResolveField(() => DeletePermissionOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_PERMISSION, Permission.DELETE)
  async deletePermission(
    @Args('input') input: DeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    return this.deletePermissionUseCase.deletePermission(input);
  }

  @ResolveField(() => DeletePermissionOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_PERMISSION,
    Permission.BULK_DELETE,
  )
  async bulkdeletePermission(
    @Args('input') input: BulkDeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    return this.bulkeletePermissionUseCase.bulkDeletePermission(input);
  }
}

export const PermissionResolvers = [
  PermissionQueryResolver,
  PermissionMutationResolver,
];
