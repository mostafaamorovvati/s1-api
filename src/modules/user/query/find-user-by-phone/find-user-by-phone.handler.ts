import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserModel } from '@/modules/user/model/user.model';
import { UserRepository } from '@/modules/user/user.repository';

import { FindUserByPhoneQuery } from './find-user-by-phone.query';
@QueryHandler(FindUserByPhoneQuery)
export class FindUserByPhoneHandler
  implements IQueryHandler<FindUserByPhoneQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ phone }: FindUserByPhoneQuery): Promise<UserModel | null> {
    const user = await this.userRepository.findByPhone(phone);
    return user;
  }
}
