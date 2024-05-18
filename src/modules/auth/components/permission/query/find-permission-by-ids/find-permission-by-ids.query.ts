import { FindPermissionByIdsInput } from '@/modules/auth/components/permission/dto/find-permission.dto';

export class FindPermissionByIdsQuery {
  constructor(readonly findPermissionByIdsInput: FindPermissionByIdsInput) {}
}
