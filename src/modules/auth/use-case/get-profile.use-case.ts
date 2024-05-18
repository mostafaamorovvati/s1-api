// user-registration.use-case.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  GetProfileInput,
  GetProfileOutput,
} from '@/modules/auth/dto/get-profile.dto';
import { GetProfileQuery } from '@/modules/auth/query/get-profile/get-profile.query';
import { USER_NOT_FOUND } from '@/modules/user/constant/error-message.constant';
import { UserEntityFactory } from '@/modules/user/entity/user.factory';
import { UserModel } from '@/modules/user/model/user.model';

@Injectable()
export class GetProfileUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userEntityFactory: UserEntityFactory,
  ) {}

  async getProfile({ id }: GetProfileInput): Promise<GetProfileOutput> {
    try {
      const user: UserModel = await this.queryBus.execute(
        new GetProfileQuery(id),
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
