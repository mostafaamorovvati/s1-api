import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { ACCESS_DENIED } from '@/modules/auth/constants/error-message.constant';
import { UpdateUserCommand } from '@/modules/user/command/update-user/update-user.command';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByIdQuery } from '@/modules/user/query/find-user-by-id/find-user-by-id.query';

@Injectable()
export class TokenHelper {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getTokens(userId: string, phone: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: userId,
          phone,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          _id: userId,
          phone,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user: UserModel = await this.queryBus.execute(
      new FindUserByIdQuery(userId),
    );

    if (!user || !user.getRefreshTokens())
      throw new ForbiddenException(ACCESS_DENIED);

    let isMatches = false;
    let index = 0;

    await Promise.all(
      user.getRefreshTokens().map(async (item, i) => {
        const refreshTokenMatches = await argon2.verify(item, refreshToken);
        if (refreshTokenMatches) {
          isMatches = true;
          index = i;
        }
      }),
    );

    if (!isMatches) throw new ForbiddenException(ACCESS_DENIED);

    const tokens = await this.getTokens(user.getId(), user.getPhone());

    const userRefreshToken = user.getRefreshTokens();

    const hashedRefreshToken = await argon2.hash(tokens.refreshToken);

    userRefreshToken[index] = hashedRefreshToken;

    await this.updateRefreshToken(user.getId(), userRefreshToken);
    return {
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshTokens: string[]) {
    await this.commandBus.execute(
      new UpdateUserCommand({
        userId: userId,
        refreshToken: refreshTokens,
      }),
    );
  }

  verifyJwtToken(token: any) {
    return this.jwtService.verify(token);
  }
}
