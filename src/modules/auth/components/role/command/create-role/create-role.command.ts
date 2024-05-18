import { CreateRoleInput } from '@/modules/auth/components/role/dto/create-role.dto';

export class CreateRoleCommand {
  constructor(public readonly createRoleInput: CreateRoleInput) {}
}
