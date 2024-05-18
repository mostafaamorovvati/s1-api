import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserWithPhoneCommand } from '@/modules/user/command/create-user-with-phone/create-user-with-phone.command';
import { SignupOutput } from '../../dto/signup.dto';
import { SignupWithPhoneCommand } from './signup-with-phone.command';

@CommandHandler(SignupWithPhoneCommand)
export class SignupWithPhoneHandler
  implements ICommandHandler<SignupWithPhoneCommand>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute({ phone }: SignupWithPhoneCommand): Promise<SignupOutput> {
    await this.commandBus.execute(new CreateUserWithPhoneCommand(phone));

    return {
      success: true,
    };
  }
}
