import { ForbiddenException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import * as argon2 from 'argon2';

import { LogoutCommand } from '@/modules/auth/command/logout/logout.command';
import { ACCESS_DENIED } from '@/modules/auth/constants/error-message.constant';
import { UpdateUserCommand } from '@/modules/user/command/update-user/update-user.command';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByIdQuery } from '@/modules/user/query/find-user-by-id/find-user-by-id.query';

@CommandHandler(LogoutCommand)
export class LogoutHandler implements ICommandHandler<LogoutCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ userId, refreshToken }: LogoutCommand) {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByIdQuery(userId),
    );

    const newRefreshTokens: string[] = [];

    const userRefreshToken = user.getRefreshTokens();

    let isMatches = false;

    await Promise.all(
      userRefreshToken.map(async item => {
        const refreshTokenMatches = await argon2.verify(item, refreshToken);
        if (!refreshTokenMatches) newRefreshTokens.push(item);
        else isMatches = true;
      }),
    );

    if (!isMatches) throw new ForbiddenException(ACCESS_DENIED);

    newRefreshTokens.reverse();

    await this.commandBus.execute(
      new UpdateUserCommand({
        userId: userId,
        refreshToken: newRefreshTokens,
      }),
    );
  }
}
