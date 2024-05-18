import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RoleModel } from '@/modules/auth/components/role/model/role.model';
import { FindRoleByIdQuery } from '@/modules/auth/components/role/query/find-role-by-id/find-role-by-id.query';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@QueryHandler(FindRoleByIdQuery)
export class FindRoleByIdHanler implements IQueryHandler<FindRoleByIdQuery> {
  constructor(private readonly roleRepository: RoleRepository) {}
  async execute({
    findRoleByIdInput,
  }: FindRoleByIdQuery): Promise<RoleModel | null> {
    const result = this.roleRepository.findById(findRoleByIdInput);
    return result;
  }
}
