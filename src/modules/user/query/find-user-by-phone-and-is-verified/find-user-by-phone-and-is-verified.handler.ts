import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserModel } from '@/modules/user/model/user.model';
import { UserRepository } from '@/modules/user/user.repository';

import { FindUserByPhoneAndIsVerifiedQuery } from './find-user-by-phone-and-is-verified.query';
@QueryHandler(FindUserByPhoneAndIsVerifiedQuery)
export class FindUserByPhoneAndIsVerifiedHandler
  implements IQueryHandler<FindUserByPhoneAndIsVerifiedQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    phone,
    isPasswordSelected,
  }: FindUserByPhoneAndIsVerifiedQuery): Promise<UserModel | null> {
    const user = await this.userRepository.findByPhoneAndIsVerified(
      { phone },
      isPasswordSelected,
    );
    return user;
  }
}
