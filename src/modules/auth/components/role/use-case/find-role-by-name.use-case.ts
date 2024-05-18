// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ROLE_NOT_FOUND } from '@/modules/auth/components/role/constant/error-message.constant';
import {
  FindRoleByNameInput,
  FindRoleOutput,
} from '@/modules/auth/components/role/dto/find-role.dto';
import { RoleEntityFactory } from '@/modules/auth/components/role/entity/role.factory';
import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { FindRoleByNameQuery } from '@/modules/auth/components/role/query/find-role-by-name/find-role-by-name-query';

@Injectable()
export class FindRoleByNameUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly roleFactory: RoleEntityFactory,
  ) {}

  async findRoleByName({ name }: FindRoleByNameInput): Promise<FindRoleOutput> {
    try {
      const role: RoleModel = await this.queryBus.execute(
        new FindRoleByNameQuery(name),
      );
      if (!role) {
        throw new NotFoundException(ROLE_NOT_FOUND);
      }
      return {
        success: true,
        result: this.roleFactory.create(role),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
