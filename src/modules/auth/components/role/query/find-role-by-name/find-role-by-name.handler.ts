import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { FindRoleByNameQuery } from '@/modules/auth/components/role/query/find-role-by-name/find-role-by-name-query';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@QueryHandler(FindRoleByNameQuery)
export class FindRoleByNameHanler
  implements IQueryHandler<FindRoleByNameQuery>
{
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({ name }: FindRoleByNameQuery): Promise<RoleModel | null> {
    const result = this.roleRepository.findByName(name);
    return result;
  }
}
