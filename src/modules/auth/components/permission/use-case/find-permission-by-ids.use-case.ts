// Permission-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindManyPermissionsOutput,
  FindPermissionByIdsInput,
} from '@/modules/auth/components/permission/dto/find-permission.dto';
import { PermissionEntityFactory } from '@/modules/auth/components/permission/entity/permission.factory';
import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { FindPermissionByIdsQuery } from '@/modules/auth/components/permission/query/find-permission-by-ids/find-permission-by-ids.query';

@Injectable()
export class FindPermissionByIdsUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly permissionFactory: PermissionEntityFactory,
  ) {}

  async findPermissionByids({
    ids,
  }: FindPermissionByIdsInput): Promise<FindManyPermissionsOutput> {
    try {
      const permissions: PermissionModel[] = await this.queryBus.execute(
        new FindPermissionByIdsQuery({ ids: ids }),
      );

      const resultList = permissions.map(model =>
        this.permissionFactory.create(model),
      );
      return {
        success: true,
        results: resultList,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
