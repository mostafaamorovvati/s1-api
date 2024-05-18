import { InternalServerErrorException } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { DeleteRoleCommand } from '@/modules/auth/components/role/command/delete-role/delete-role.command';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';
import { RemoveRoleFromUsersCommand } from '@/modules/user/command/remove-role-from-users/remove-role-from-users.command';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly commandBus: CommandBus,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async execute(command: DeleteRoleCommand) {
    const { deleteRoleInput } = command;
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.roleRepository.delete(deleteRoleInput);
      await this.commandBus.execute(
        new RemoveRoleFromUsersCommand(deleteRoleInput.roleId),
      );
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(error);
    }
  }
}
