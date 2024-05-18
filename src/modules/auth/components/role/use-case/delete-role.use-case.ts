// user-registration.use-case.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteRoleCommand } from '@/modules/auth/components/role/command/delete-role/delete-role.command';
import {
  DeleteRoleInput,
  DeleteRoleOutput,
} from '@/modules/auth/components/role/dto/delete-role.dto';
import { RoleHelepr } from '@/modules/auth/components/role/helper/role-helper';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly roleHelper: RoleHelepr,
  ) {}

  async deleteRole(input: DeleteRoleInput): Promise<DeleteRoleOutput> {
    try {
      await this.roleHelper.validateRoleId(input.roleId);
      await this.commandBus.execute(new DeleteRoleCommand(input));
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
