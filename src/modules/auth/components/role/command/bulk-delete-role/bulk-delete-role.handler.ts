import { InternalServerErrorException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { BulkDeleteRoleCommand } from '@/modules/auth/components/role/command/bulk-delete-role/bulk-delete-role.command';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';
import { RemoveRoleFromUsersCommand } from '@/modules/user/command/remove-role-from-users/remove-role-from-users.command';

@CommandHandler(BulkDeleteRoleCommand)
export class BulkDeleteRoleHandler
  implements ICommandHandler<BulkDeleteRoleCommand>
{
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly commandBus: CommandBus,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async execute(command: BulkDeleteRoleCommand) {
    const { bulkDeleteRoleInput } = command;
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.roleRepository.bulkDelete(bulkDeleteRoleInput.ids);
      for (const roleId of bulkDeleteRoleInput.ids) {
        await this.commandBus.execute(new RemoveRoleFromUsersCommand(roleId));
      }
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(error);
    }
  }
}
