import { DeleteRoleInput } from '@/modules/auth/components/role/dto/delete-role.dto';

export class DeleteRoleCommand {
  constructor(public readonly deleteRoleInput: DeleteRoleInput) {}
}
