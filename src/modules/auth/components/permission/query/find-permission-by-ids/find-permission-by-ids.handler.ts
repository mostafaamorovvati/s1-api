import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { FindPermissionByIdsQuery } from '@/modules/auth/components/permission/query/find-permission-by-ids/find-permission-by-ids.query';

@QueryHandler(FindPermissionByIdsQuery)
export class FindPermissionByIdsHanler
  implements IQueryHandler<FindPermissionByIdsQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    findPermissionByIdsInput,
  }: FindPermissionByIdsQuery): Promise<PermissionModel[] | null> {
    const result = this.permissionRepository.findManyById(
      findPermissionByIdsInput,
    );
    return result;
  }
}
