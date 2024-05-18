// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { RefreshTokenCommand } from '@/modules/auth/command/refresh-token/refresh-token.command';
import { RefreshTokenOutput } from '@/modules/auth/dto/refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<RefreshTokenOutput> {
    try {
      const tokens = await this.commandBus.execute(
        new RefreshTokenCommand(userId, refreshToken),
      );

      return {
        success: true,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
