import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailAndIsVerifiedQuery } from '@/modules/user/query/find-user-by-email-and-is-verified/find-user-by-email-and-is-verified.query';
import { UserRepository } from '@/modules/user/user.repository';

@QueryHandler(FindUserByEmailAndIsVerifiedQuery)
export class FindUserByEmailAndIsVerifiedHandler
  implements IQueryHandler<FindUserByEmailAndIsVerifiedQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    isPasswordSelected,
  }: FindUserByEmailAndIsVerifiedQuery): Promise<UserModel | null> {
    const user = await this.userRepository.findByEmailAndIsVerified(
      { email },
      isPasswordSelected,
    );
    return user;
  }
}
