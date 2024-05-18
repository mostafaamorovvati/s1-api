import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveRoleFromUsersCommand } from '@/modules/user/command/remove-role-from-users/remove-role-from-users.command';
import { UserRepository } from '@/modules/user/user.repository';

@CommandHandler(RemoveRoleFromUsersCommand)
export class RemoveRoleFromUsersHandler
  implements ICommandHandler<RemoveRoleFromUsersCommand>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ roleId }: RemoveRoleFromUsersCommand) {
    return this.userRepository.removeRoleFromUsers(roleId);
  }
}
