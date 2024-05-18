// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
  FindUserByPhoneInput,
  FindUserOutput,
} from '@/modules/user/dto/find-user.dto';
import { UserEntityFactory } from '@/modules/user/entity/user.factory';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailAndIsVerifiedQuery } from '@/modules/user/query/find-user-by-email-and-is-verified/find-user-by-email-and-is-verified.query';

import { FindUserByPhoneAndIsVerifiedQuery } from '../query/find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.query';

@Injectable()
export class FindUserByPhoneOrEmailAndIsVerifiedUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly userFactory: UserEntityFactory,
  ) {}

  async findUserByPhoneOrEmailAndIsVerified(
    { phone, email }: FindUserByPhoneInput,
    isPasswordSelected?: boolean,
  ): Promise<FindUserOutput> {
    try {
      let user: UserModel;
      if (phone) {
        user = await this.queryBus.execute(
          new FindUserByPhoneAndIsVerifiedQuery(phone, isPasswordSelected),
        );
      } else if (email) {
        user = await this.queryBus.execute(
          new FindUserByEmailAndIsVerifiedQuery(email, isPasswordSelected),
        );
      }
      return {
        success: user ? true : false,
        result: this.userFactory.create(user),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
