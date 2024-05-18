import { UpdateRoleInput } from '@/modules/auth/components/role/dto/update-role.dto';

export class UpdateRoleCommand {
  constructor(public readonly updateRoleInput: UpdateRoleInput) {}
}
