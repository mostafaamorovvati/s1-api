import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '@/modules/user/command/update-user/update-user.command';
import { UserRepository } from '@/modules/user/user.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand) {
    const { updateUserInput } = command;
    await this.userRepository.update(updateUserInput);
  }
}
