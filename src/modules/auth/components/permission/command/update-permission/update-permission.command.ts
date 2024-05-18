import { UpdatePermissionInput } from '@/modules/auth/components/permission/dto/update-permission.dto';

export class UpdatePermissionCommand {
  constructor(public readonly updatePermissionInput: UpdatePermissionInput) {}
}
