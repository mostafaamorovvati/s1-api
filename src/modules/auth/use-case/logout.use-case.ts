// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LogoutCommand } from '@/modules/auth/command/logout/logout.command';
import { LogoutOutput } from '@/modules/auth/dto/logout.dto';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async logout(userId: string, refreshToken: string): Promise<LogoutOutput> {
    try {
      await this.commandBus.execute(new LogoutCommand(userId, refreshToken));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
