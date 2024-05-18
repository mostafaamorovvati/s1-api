import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailQuery } from '@/modules/user/query/find-user-by-email/find-user-by-email.query';
import { UserRepository } from '@/modules/user/user.repository';
@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler
  implements IQueryHandler<FindUserByEmailQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    isPasswordSelected,
  }: FindUserByEmailQuery): Promise<UserModel | null> {
    const user = await this.userRepository.findByEmail(
      { email },
      isPasswordSelected,
    );
    return user;
  }
}
