// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteUserCommand } from '@/modules/user/command/delete-user/delete-user.command';
import {
  DeleteUserInput,
  DeleteUserOutput,
} from '@/modules/user/dto/delete-user.dto';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async deleteUser(input: DeleteUserInput): Promise<DeleteUserOutput> {
    try {
      await this.commandBus.execute(new DeleteUserCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
