import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';
import {
  CreateRoleInput,
  CreateRoleOutput,
} from '@/modules/auth/components/role/dto/create-role.dto';
import {
  BulkDeleteRoleInput,
  DeleteRoleInput,
  DeleteRoleOutput,
} from '@/modules/auth/components/role/dto/delete-role.dto';
import {
  FindManyRolesOutput,
  FindRoleByIdInput,
  FindRoleByIdsInput,
  FindRoleOutput,
} from '@/modules/auth/components/role/dto/find-role.dto';
import {
  RoleMutation,
  RoleQuery,
} from '@/modules/auth/components/role/dto/role.dto';
import {
  SearchRoleInput,
  SearchRoleOutput,
} from '@/modules/auth/components/role/dto/search-role.dto';
import {
  UpdateRoleInput,
  UpdateRoleOutput,
} from '@/modules/auth/components/role/dto/update-role.dto';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';
import RoleDataLoader from '@/modules/auth/components/role/role.loader';
import { BulkDeleteRoleUseCase } from '@/modules/auth/components/role/use-case/bulk-delete-role.user-case';
import { CreateRoleUseCase } from '@/modules/auth/components/role/use-case/create-role.use-case';
import { DeleteRoleUseCase } from '@/modules/auth/components/role/use-case/delete-role.use-case';
import { FindRoleByIdUseCase } from '@/modules/auth/components/role/use-case/find-role-by-id.use-case';
import { FindRoleByIdsUseCase } from '@/modules/auth/components/role/use-case/find-role-by-ids.use-case';
import { SearchRoleUseCase } from '@/modules/auth/components/role/use-case/search-role.use-case';
import { UpdateRoleUseCase } from '@/modules/auth/components/role/use-case/update-role.use-case';
import { PanelGuard } from '@/modules/auth/guards/panel.guard';
import { Permission } from '@/common/permissions/permission-type';

@Resolver(() => RoleQuery)
export class RoleQueryResolver {
  constructor(
    private readonly searchRoleUseCase: SearchRoleUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
    private readonly findRoleByIdsUseCase: FindRoleByIdsUseCase,
  ) {}

  @ResolveField(() => FindRoleOutput)
  async findRoleById(
    @Args('input') input: FindRoleByIdInput,
  ): Promise<FindRoleOutput> {
    return this.findRoleByIdUseCase.findRoleByid(input);
  }

  @ResolveField(() => FindManyRolesOutput)
  async findRoleByIds(
    @Args('input') input: FindRoleByIdsInput,
  ): Promise<FindManyRolesOutput> {
    return this.findRoleByIdsUseCase.findRoleByids(input);
  }

  @ResolveField(() => SearchRoleOutput)
  async searchRoles(
    @Args('input') input: SearchRoleInput,
  ): Promise<SearchRoleOutput> {
    return this.searchRoleUseCase.search(input);
  }
}

@Resolver(() => RoleMutation)
export class RoleMutationResolver {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly bulkDeleteRoleUseCase: BulkDeleteRoleUseCase,
  ) {}

  @ResolveField(() => CreateRoleOutput)
  @PanelGuard<MethodDecorator>(Permission.CREATE_ROLE, Permission.CREATE)
  async createRole(
    @Args('input') input: CreateRoleInput,
  ): Promise<CreateRoleOutput> {
    return this.createRoleUseCase.createRole(input);
  }

  @ResolveField(() => UpdateRoleOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_ROLE, Permission.UPDATE)
  async updateRole(
    @Args('input') input: UpdateRoleInput,
  ): Promise<UpdateRoleOutput> {
    return this.updateRoleUseCase.updateRole(input);
  }

  @ResolveField(() => DeleteRoleOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_ROLE, Permission.DELETE)
  async deleteRole(
    @Args('input') input: DeleteRoleInput,
  ): Promise<DeleteRoleOutput> {
    return this.deleteRoleUseCase.deleteRole(input);
  }

  @ResolveField(() => DeleteRoleOutput)
  @PanelGuard<MethodDecorator>(
    Permission.BULK_DELETE_ROLE,
    Permission.BULK_DELETE,
  )
  async bulkDeleteRole(
    @Args('input') input: BulkDeleteRoleInput,
  ): Promise<DeleteRoleOutput> {
    return this.bulkDeleteRoleUseCase.bulkDeleteRole(input);
  }
}

@Resolver(() => RoleEntity)
export class RoleResolver {
  constructor(private readonly loader: RoleDataLoader) {}
  @ResolveField(() => [PermissionEntity], { nullable: true })
  async permissions(@Parent() role: RoleEntity) {
    const permissions = await this.loader.batchPermission.load(
      role.permissions,
    );

    return permissions;
  }
}

export const RoleResolvers = [
  RoleQueryResolver,
  RoleMutationResolver,
  RoleResolver,
];
