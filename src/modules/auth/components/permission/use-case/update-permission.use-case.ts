// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { UpdatePermissionCommand } from '@/modules/auth/components/permission/command/update-permission/update-permission.command';
import {
  UpdatePermissionInput,
  UpdatePermissionOutput,
} from '@/modules/auth/components/permission/dto/update-permission.dto';
import { PermissionHelepr } from '@/modules/auth/components/permission/helper/permission-helper';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly permissionHelper: PermissionHelepr,
  ) {}

  async updatePermission(
    input: UpdatePermissionInput,
  ): Promise<UpdatePermissionOutput> {
    try {
      await this.permissionHelper.validatePermissionId(input.permissionId);
      await this.permissionHelper.validatePermissionName(
        input.name,
        input.permissionId,
      );
      await this.permissionHelper.validatePermissionTitle(
        input.title,
        input.permissionId,
      );
      await this.commandBus.execute(new UpdatePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
