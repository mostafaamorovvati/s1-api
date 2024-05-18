import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { CoreOutput } from '@/common/dtos/output.dto';
import { Permission } from '@/common/permissions/permission-type';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';
import {
  CreateUserInput,
  CreateUserOutput,
} from '@/modules/user/dto/create-user.dto';
import {
  DeleteUserInput,
  DeleteUserOutput,
} from '@/modules/user/dto/delete-user.dto';
import {
  FindManyUserOutput,
  FindUserByEmailInput,
  FindUserByIdInput,
  FindUserByPhoneInput,
  FindUserOutput,
  FindUsersByRoleInput,
} from '@/modules/user/dto/find-user.dto';
import {
  SearchUserInput,
  SearchUserOutput,
} from '@/modules/user/dto/search-user.dto';
import {
  UpdateUserInput,
  UpdateUserOutput,
} from '@/modules/user/dto/update-user.dto';
import { UserMutation, UserQuery } from '@/modules/user/dto/user.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { CreateUserUseCase } from '@/modules/user/use-case/create-user.use-case';
import { DeleteUserUseCase } from '@/modules/user/use-case/delete-user.use-case';
import { FindUserByEmailUseCase } from '@/modules/user/use-case/find-user-by-email.use-case';
import { FindUserByIdUseCase } from '@/modules/user/use-case/find-user-by-id.use-case';
import { FindUsersByRoleUseCase } from '@/modules/user/use-case/find-users-by-role.use-case';
import { SearchUserUseCase } from '@/modules/user/use-case/search-user.use-case';
import { UpdateUserUseCase } from '@/modules/user/use-case/update-user.use-case';
import UserDataLoader from '@/modules/user/user.loader';

import { PanelGuard } from '../auth/guards/panel.guard';
import { FindUserByPhoneOrEmailAndIsVerifiedUseCase } from './use-case/find-user-by-phone-or-email-and-is-verified.use-case';

@Resolver(() => UserQuery)
export class UserQueryResolver {
  constructor(
    private readonly searchUserUseCase: SearchUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly findUserByPhoneUseCase: FindUserByPhoneOrEmailAndIsVerifiedUseCase,
    private readonly findUsersByRoleUseCase: FindUsersByRoleUseCase,
  ) {}

  @Query(() => UserQuery)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => FindUserOutput)
  async findUserById(
    @Args('input') input: FindUserByIdInput,
  ): Promise<FindUserOutput> {
    return this.findUserByIdUseCase.findUserByid(input);
  }

  @ResolveField(() => FindUserOutput)
  async findUserByEmail(
    @Args('input') input: FindUserByEmailInput,
  ): Promise<FindUserOutput> {
    return this.findUserByEmailUseCase.findUserByEmail(input);
  }

  @ResolveField(() => CoreOutput)
  async findUserByPhoneAndIsVerified(
    @Args('input') input: FindUserByPhoneInput,
  ): Promise<CoreOutput> {
    return this.findUserByPhoneUseCase.findUserByPhoneOrEmailAndIsVerified(
      input,
    );
  }

  @ResolveField(() => FindManyUserOutput)
  async findUsersByRole(
    @Args('input') input: FindUsersByRoleInput,
  ): Promise<FindManyUserOutput> {
    return this.findUsersByRoleUseCase.findUsersByRole(input);
  }

  @ResolveField(() => SearchUserOutput)
  async searchUser(
    @Args('input') input: SearchUserInput,
  ): Promise<SearchUserOutput> {
    return this.searchUserUseCase.search(input);
  }
}

@Resolver(() => UserMutation)
export class UserMutationResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Mutation(() => UserMutation)
  async user() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => CreateUserOutput)
  @PanelGuard<MethodDecorator>(Permission.CREATE_USER, Permission.CREATE)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.createUserUseCase.createUser(input);
  }

  @ResolveField(() => UpdateUserOutput)
  @PanelGuard<MethodDecorator>(Permission.UPDATE_USER, Permission.UPDATE)
  async updateUser(
    @Args('input') input: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.updateUserUseCase.updateUser(input);
  }

  @ResolveField(() => DeleteUserOutput)
  @PanelGuard<MethodDecorator>(Permission.DELETE_USER, Permission.DELETE)
  async deleteUser(
    @Args('input') input: DeleteUserInput,
  ): Promise<DeleteUserOutput> {
    return this.deleteUserUseCase.deleteUser(input);
  }
}

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly loader: UserDataLoader) {}

  @ResolveField(() => [PermissionEntity], { nullable: true })
  async permissions(@Parent() role: UserEntity) {
    const permissions = await this.loader.batchPermission.load(
      role.permissions,
    );
    return permissions;
  }

  @ResolveField(() => [RoleEntity], { nullable: true })
  async roles(@Parent() role: UserEntity) {
    const roles = await this.loader.batchRole.load(role.roles);
    return roles;
  }
}

export const UserResolvers = [
  UserQueryResolver,
  UserMutationResolver,
  UserResolver,
];
