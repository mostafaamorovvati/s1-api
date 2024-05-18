// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '@/modules/user/command/create-user';
import {
  CreateUserInput,
  CreateUserOutput,
} from '@/modules/user/dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async createUser(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      await this.commandBus.execute(new CreateUserCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
