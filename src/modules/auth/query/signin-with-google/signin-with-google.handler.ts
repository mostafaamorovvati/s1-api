import {
  CommandBus,
  IQueryHandler,
  QueryBus,
  QueryHandler,
} from '@nestjs/cqrs';
import * as argon2 from 'argon2';

import { SigninOutput } from '@/modules/auth/dto/signin.dto';
import { SigninWithGoogleQuery } from '@/modules/auth/query/signin-with-google/signin-with-google.query';
import { TokenHelper } from '@/modules/auth/utils/token.helper';
import { CreateUserWithGoogleCommand } from '@/modules/user/command/create-user-with-google/create-user-with-google.command';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailQuery } from '@/modules/user/query/find-user-by-email/find-user-by-email.query';

@QueryHandler(SigninWithGoogleQuery)
export class SigninWithGoogleHandler
  implements IQueryHandler<SigninWithGoogleQuery>
{
  constructor(
    private readonly tokenHelper: TokenHelper,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ reqUser }: SigninWithGoogleQuery): Promise<SigninOutput> {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByEmailQuery(reqUser.email, false),
    );

    if (user) {
      const { accessToken, refreshToken } = await this.tokenHelper.getTokens(
        user.getId(),
        user.getEmail(),
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
    } else {
      const newUser: UserModel = await this.commandBus.execute(
        new CreateUserWithGoogleCommand(
          reqUser.email,
          reqUser.displayName,
          reqUser.googleId,
        ),
      );

      const { accessToken, refreshToken } = await this.tokenHelper.getTokens(
        newUser.getId(),
        newUser.getEmail(),
      );

      const hashedRefreshToken = await argon2.hash(refreshToken);
      await this.tokenHelper.updateRefreshToken(newUser.getId(), [
        hashedRefreshToken,
      ]);
      return {
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
  }
}
