import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateRoleCommand } from '@/modules/auth/components/role/command/create-role/create-role.command';
import { RoleModelFactory } from '@/modules/auth/components/role/model/role-model.factory';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(private readonly roleModelFactory: RoleModelFactory) {}

  async execute(command: CreateRoleCommand) {
    const { createRoleInput } = command;
    await this.roleModelFactory.create(createRoleInput);
  }
}
