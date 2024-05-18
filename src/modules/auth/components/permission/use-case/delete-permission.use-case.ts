// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeletePermissionCommand } from '@/modules/auth/components/permission/command/delete-permission/delete-permission.command';
import {
  DeletePermissionInput,
  DeletePermissionOutput,
} from '@/modules/auth/components/permission/dto/delete-permission.dto';
import { PermissionHelepr } from '@/modules/auth/components/permission/helper/permission-helper';

@Injectable()
export class DeletePermissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly permissionHelepr: PermissionHelepr,
  ) {}

  async deletePermission(
    input: DeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    try {
      await this.permissionHelepr.validatePermissionId(input.permissionId);
      await this.commandBus.execute(new DeletePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
