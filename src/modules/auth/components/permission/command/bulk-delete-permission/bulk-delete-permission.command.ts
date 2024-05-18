import { BulkDeletePermissionInput } from '@/modules/auth/components/permission/dto/delete-permission.dto';

export class BulkDeletePermissionCommand {
  constructor(
    public readonly bulkDeletePermissionInput: BulkDeletePermissionInput,
  ) {}
}
