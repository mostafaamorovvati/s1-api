import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '@/modules/user/user.repository';

import { UpdatePasswordCommand } from './update-password.command';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdatePasswordCommand) {
    const { userId, password } = command;
    const hashPassword = await bcrypt.hash(password, 10);
    await this.userRepository.updatePassword({
      userId: userId,
      password: hashPassword,
    });
  }
}
