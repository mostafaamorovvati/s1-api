import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { FindPermissionByNameQuery } from '@/modules/auth/components/permission/query/find-permission-by-name/find-permission-by-name.query';

@QueryHandler(FindPermissionByNameQuery)
export class FindPermissionByNameHanler
  implements IQueryHandler<FindPermissionByNameQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    name,
  }: FindPermissionByNameQuery): Promise<PermissionModel | null> {
    const result = this.permissionRepository.findByName(name);
    return result;
  }
}
