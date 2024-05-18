// Permission-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyRolesOutput,
  FindRoleByIdsInput,
} from '@/modules/auth/components/role/dto/find-role.dto';
import { RoleEntityFactory } from '@/modules/auth/components/role/entity/role.factory';
import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { FindRoleByIdsQuery } from '@/modules/auth/components/role/query/find-role-by-ids/find-role-by-ids.query';

@Injectable()
export class FindRoleByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleFactory: RoleEntityFactory,
  ) {}

  async findRoleByids({
    ids,
  }: FindRoleByIdsInput): Promise<FindManyRolesOutput> {
    try {
      const roles: RoleModel[] = await this.queryBus.execute(
        new FindRoleByIdsQuery({ ids: ids }),
      );

      const resultList = roles.map(model => this.roleFactory.create(model));
      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
