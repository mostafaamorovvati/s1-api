// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeletePermissionCommand } from '@/modules/auth/components/Permission/command/bulk-delete-Permission/bulk-delete-Permission.command';
import {
  BulkDeletePermissionInput,
  DeletePermissionOutput,
} from '@/modules/auth/components/permission/dto/delete-permission.dto';
import { PermissionHelepr } from '@/modules/auth/components/permission/helper/permission-helper';

@Injectable()
export class BulkDeletePermissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly permissionHelper: PermissionHelepr,
  ) {}

  async bulkDeletePermission(
    input: BulkDeletePermissionInput,
  ): Promise<DeletePermissionOutput> {
    try {
      for (const id of input.ids) {
        await this.permissionHelper.validatePermissionId(id);
      }
      await this.commandBus.execute(new BulkDeletePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
