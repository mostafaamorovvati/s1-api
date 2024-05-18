import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RefreshTokenCommand } from '@/modules/auth/command/refresh-token/refresh-token.command';
import { RefreshTokenOutput } from '@/modules/auth/dto/refresh-token.dto';
import { TokenHelper } from '@/modules/auth/utils/token.helper';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(private tokenHelper: TokenHelper) {}

  async execute({
    userId,
    refreshToken,
  }: RefreshTokenCommand): Promise<RefreshTokenOutput> {
    const tokens = await this.tokenHelper.refreshToken(userId, refreshToken);
    return {
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
