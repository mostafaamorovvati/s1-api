import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByIdQuery } from '@/modules/user/query/find-user-by-id/find-user-by-id.query';
import { UserRepository } from '@/modules/user/user.repository';
@QueryHandler(FindUserByIdQuery)
export class FindUserbyIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: FindUserByIdQuery): Promise<UserModel | null> {
    return this.userRepository.findById({ id });
  }
}
