import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchPermissionOutput } from '@/modules/auth/components/permission/dto/search-permission.dto';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { SearchPermissionQuery } from '@/modules/auth/components/permission/query/search-permission/search-permission.query';

@QueryHandler(SearchPermissionQuery)
export class SearchPermissionHanler
  implements IQueryHandler<SearchPermissionQuery>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async execute({
    searchPermissionInput,
  }: SearchPermissionQuery): Promise<SearchPermissionOutput> {
    const result = await this.permissionRepository.search(
      searchPermissionInput,
    );
    return result;
  }
}
