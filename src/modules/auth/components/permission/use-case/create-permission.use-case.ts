import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreatePermissionCommand } from '@/modules/auth/components/permission/command/create-permission/create-permission.command';
import {
  CreatePermissionInput,
  CreatePermissionOutput,
} from '@/modules/auth/components/permission/dto/create-permission.dto';
import { PermissionHelepr } from '@/modules/auth/components/permission/helper/permission-helper';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly permissionHelper: PermissionHelepr,
  ) {}

  async createPermission(
    input: CreatePermissionInput,
  ): Promise<CreatePermissionOutput> {
    try {
      await this.permissionHelper.validatePermissionName(input.name, null);
      await this.permissionHelper.validatePermissionTitle(input.title, null);

      await this.commandBus.execute(new CreatePermissionCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
