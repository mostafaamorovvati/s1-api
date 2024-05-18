import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserEntity } from '@/modules/user/entity/user.entity';
import { UserRepository } from '@/modules/user/user.repository';
import { FindUsersByRoleQuery } from './find-users-by-role.query';
@QueryHandler(FindUsersByRoleQuery)
export class FindUsersByRoleHandler
  implements IQueryHandler<FindUsersByRoleQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ roleId }: FindUsersByRoleQuery): Promise<UserEntity[]> {
    const user = await this.userRepository.findUsersByRole(roleId);
    return user;
  }
}
