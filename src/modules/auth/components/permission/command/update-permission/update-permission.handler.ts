import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdatePermissionCommand } from '@/modules/auth/components/permission/command/update-permission/update-permission.command';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler
  implements ICommandHandler<UpdatePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: UpdatePermissionCommand) {
    const { updatePermissionInput } = command;
    await this.permissionRepository.update(updatePermissionInput);
  }
}
