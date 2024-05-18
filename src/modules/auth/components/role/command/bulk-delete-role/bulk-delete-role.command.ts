import { BulkDeleteRoleInput } from '@/modules/auth/components/role/dto/delete-role.dto';

export class BulkDeleteRoleCommand {
  constructor(public readonly bulkDeleteRoleInput: BulkDeleteRoleInput) {}
}
