import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteUserCommand } from '@/modules/user/command/delete-user/delete-user.command';
import { UserRepository } from '@/modules/user/user.repository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: DeleteUserCommand) {
    const { deleteUserInput } = command;
    await this.userRepository.delete(deleteUserInput);
  }
}
