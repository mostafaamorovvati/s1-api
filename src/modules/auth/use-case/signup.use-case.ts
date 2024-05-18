// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { SignupCommand } from '@/modules/auth/command/signup/signup.command';
import { SignupInput, SignupOutput } from '@/modules/auth/dto/signup.dto';

@Injectable()
export class SignupUseCase {
  constructor(private readonly commandBus: CommandBus) {}

  async signup({
    email,
    password,
    displayName,
    phone,
  }: SignupInput): Promise<SignupOutput> {
    try {
      await this.commandBus.execute(
        new SignupCommand(email, password, displayName, phone),
      );
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
