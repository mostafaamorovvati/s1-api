import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateRoleCommand } from '@/modules/auth/components/role/command/update-role/update-role.command';
import { RoleRepository } from '@/modules/auth/components/role/role.repository';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(command: UpdateRoleCommand) {
    const { updateRoleInput } = command;
    await this.roleRepository.update(updateRoleInput);
  }
}
