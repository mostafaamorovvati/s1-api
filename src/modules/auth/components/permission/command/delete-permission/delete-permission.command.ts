import { DeletePermissionInput } from '@/modules/auth/components/permission/dto/delete-permission.dto';

export class DeletePermissionCommand {
  constructor(public readonly deletePermissionInput: DeletePermissionInput) {}
}
