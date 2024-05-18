// Permission-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { PERMISSION_NOT_FOUND } from '@/modules/auth/components/permission/constant/error-message.constant';
import {
  FindPermissionByNameInput,
  FindPermissionOutput,
} from '@/modules/auth/components/permission/dto/find-permission.dto';
import { PermissionEntityFactory } from '@/modules/auth/components/permission/entity/permission.factory';
import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { FindPermissionByNameQuery } from '@/modules/auth/components/permission/query/find-permission-by-name/find-permission-by-name.query';

@Injectable()
export class FindPermissionByNameUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionFactory: PermissionEntityFactory,
  ) {}

  async findPermissionByName({
    name,
  }: FindPermissionByNameInput): Promise<FindPermissionOutput> {
    try {
      const permission: PermissionModel = await this.queryBus.execute(
        new FindPermissionByNameQuery(name),
      );
      if (!permission) {
        throw new NotFoundException(PERMISSION_NOT_FOUND);
      }
      return {
        success: true,
        result: this.permissionFactory.create(permission),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
