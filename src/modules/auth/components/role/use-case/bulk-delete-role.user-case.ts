// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { BulkDeleteRoleCommand } from '@/modules/auth/components/role/command/bulk-delete-role/bulk-delete-role.command';
import {
  BulkDeleteRoleInput,
  DeleteRoleOutput,
} from '@/modules/auth/components/role/dto/delete-role.dto';
import { RoleHelepr } from '@/modules/auth/components/role/helper/role-helper';

@Injectable()
export class BulkDeleteRoleUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly roleHelper: RoleHelepr,
  ) {}

  async bulkDeleteRole(input: BulkDeleteRoleInput): Promise<DeleteRoleOutput> {
    try {
      for (const roleId of input.ids) {
        await this.roleHelper.validateRoleId(roleId);
      }
      await this.commandBus.execute(new BulkDeleteRoleCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
