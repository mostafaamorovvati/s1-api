// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateUserCommand } from '@/modules/user/command/update-user/update-user.command';
import {
  UpdateUserInput,
  UpdateUserOutput,
} from '@/modules/user/dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async updateUser(input: UpdateUserInput): Promise<UpdateUserOutput> {
    try {
      await this.commandBus.execute(new UpdateUserCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
