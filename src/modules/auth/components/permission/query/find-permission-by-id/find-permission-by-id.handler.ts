import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PermissionModel } from '@/modules/auth/components/permission/model/permission.model';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { FindPermissionByIdQuery } from '@/modules/auth/components/permission/query/find-permission-by-id/find-permission-by-id.query';

@QueryHandler(FindPermissionByIdQuery)
export class FindPermissionByIdHanler
  implements IQueryHandler<FindPermissionByIdQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    findPermissionByIdInput,
  }: FindPermissionByIdQuery): Promise<PermissionModel | null> {
    const result = this.permissionRepository.findById(findPermissionByIdInput);
    return result;
  }
}
