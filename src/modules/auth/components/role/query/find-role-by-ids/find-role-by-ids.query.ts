import { FindRoleByIdsInput } from '@/modules/auth/components/role/dto/find-role.dto';

export class FindRoleByIdsQuery {
  constructor(readonly findRoleByIdsInput: FindRoleByIdsInput) {}
}
