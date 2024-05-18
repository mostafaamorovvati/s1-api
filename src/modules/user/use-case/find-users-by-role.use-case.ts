// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyUserOutput,
  FindUsersByRoleInput,
} from '@/modules/user/dto/find-user.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';
import { FindUsersByRoleQuery } from '../query/find-users-by-role/find-users-by-role.query';

@Injectable()
export class FindUsersByRoleUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async findUsersByRole({
    roleId,
  }: FindUsersByRoleInput): Promise<FindManyUserOutput> {
    try {
      const users: UserEntity[] = await this.queryBus.execute(
        new FindUsersByRoleQuery(roleId),
      );

      return {
        success: true,
        results: users,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
