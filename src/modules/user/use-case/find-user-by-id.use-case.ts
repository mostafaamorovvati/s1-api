// user-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { USER_NOT_FOUND } from '@/modules/user/constant/error-message.constant';
import {
  FindUserByIdInput,
  FindUserOutput,
} from '@/modules/user/dto/find-user.dto';
import { UserEntityFactory } from '@/modules/user/entity/user.factory';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByIdQuery } from '@/modules/user/query/find-user-by-id/find-user-by-id.query';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userEntityFactory: UserEntityFactory,
  ) {}

  async findUserByid({ id }: FindUserByIdInput): Promise<FindUserOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new FindUserByIdQuery(id),
      );
      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      return {
        success: true,
        result: this.userEntityFactory.create(user),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
