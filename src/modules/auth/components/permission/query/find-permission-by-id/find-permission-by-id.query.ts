import { FindPermissionByIdInput } from '@/modules/auth/components/permission/dto/find-permission.dto';

export class FindPermissionByIdQuery {
  constructor(readonly findPermissionByIdInput: FindPermissionByIdInput) {}
}
