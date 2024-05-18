import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import * as argon2 from 'argon2';

import { SigninOutput } from '@/modules/auth/dto/signin.dto';
import { SigninQuery } from '@/modules/auth/query/signin-query/signin-query';
import { TokenHelper } from '@/modules/auth/utils/token.helper';
import {
  INCORRECT_PASSWORD,
  USER_NOT_FOUND,
} from '@/modules/user/constant/error-message.constant';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailAndIsVerifiedQuery } from '@/modules/user/query/find-user-by-email-and-is-verified/find-user-by-email-and-is-verified.query';
import { FindUserByPhoneAndIsVerifiedQuery } from '@/modules/user/query/find-user-by-phone-and-is-verified/find-user-by-phone-and-is-verified.query';

@QueryHandler(SigninQuery)
export class SigninHandler implements IQueryHandler<SigninQuery> {
  private readonly IS_PASSWORD_SELECTED = true;
  constructor(
    private readonly tokenHelper: TokenHelper,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ signinInput }: SigninQuery): Promise<SigninOutput> {
    const { phone, email, password } = signinInput;

    let user: UserModel;
    if (phone) {
      user = await this.queryBus.execute(
        new FindUserByPhoneAndIsVerifiedQuery(phone, this.IS_PASSWORD_SELECTED),
      );
    } else if (email) {
      user = await this.queryBus.execute(
        new FindUserByEmailAndIsVerifiedQuery(email, this.IS_PASSWORD_SELECTED),
      );
    }

    if (!user) throw new BadRequestException(USER_NOT_FOUND);

    const isValid = password && (await user.validatePassword(password));

    if (!isValid || !user) throw new UnauthorizedException(INCORRECT_PASSWORD);

    const { accessToken, refreshToken } = await this.tokenHelper.getTokens(
      user.getId(),
      user.getPhone(),
    );

    const hashedRefreshToken = await argon2.hash(refreshToken);

    const userRefreshToken = user.getRefreshTokens();

    if (userRefreshToken.length == 3) userRefreshToken.shift();

    userRefreshToken.push(hashedRefreshToken);

    await this.tokenHelper.updateRefreshToken(user.getId(), userRefreshToken);
    return {
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
