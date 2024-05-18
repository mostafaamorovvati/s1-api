import { CreatePermissionInput } from '@/modules/auth/components/permission/dto/create-permission.dto';

export class CreatePermissionCommand {
  constructor(public readonly createPermissionInput: CreatePermissionInput) {}
}
