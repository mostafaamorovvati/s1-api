import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';

import { GetProfileQuery } from '@/modules/auth/query/get-profile/get-profile.query';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByIdQuery } from '@/modules/user/query/find-user-by-id/find-user-by-id.query';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler implements IQueryHandler<GetProfileQuery> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute({ userId }: GetProfileQuery): Promise<UserModel | null> {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByIdQuery(userId),
    );
    return user;
  }
}
