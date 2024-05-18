import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { FindRoleByIdsQuery } from '@/modules/auth/components/role/query/find-role-by-ids/find-role-by-ids.query';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@QueryHandler(FindRoleByIdsQuery)
export class FindRoleByIdsHanler implements IQueryHandler<FindRoleByIdsQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({
    findRoleByIdsInput,
  }: FindRoleByIdsQuery): Promise<RoleModel[] | null> {
    const result = this.roleRepository.findManyById(findRoleByIdsInput);
    return result;
  }
}
