import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeletePermissionCommand } from '@/modules/auth/components/permission/command/delete-permission/delete-permission.command';
import { PERMISSION_IS_USED } from '@/modules/auth/components/permission/constant/error-message.constant';
import { PermissionRepository } from '@/modules/auth/components/permission/permission.repository';
import { Permission } from '@/common/permissions/permission-type';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler
  implements ICommandHandler<DeletePermissionCommand>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(command: DeletePermissionCommand) {
    const { deletePermissionInput } = command;

    const dbPermission = await this.permissionRepository.findById({
      id: deletePermissionInput.permissionId,
    });

    Object.keys(Permission).map(key => {
      if (Permission[key].name === dbPermission.getName())
        throw new BadRequestException(PERMISSION_IS_USED);
    });

    await this.permissionRepository.delete(deletePermissionInput);
  }
}
