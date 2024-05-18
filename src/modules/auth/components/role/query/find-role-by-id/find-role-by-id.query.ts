import { FindRoleByIdInput } from '@/modules/auth/components/role/dto/find-role.dto';

export class FindRoleByIdQuery {
  constructor(readonly findRoleByIdInput: FindRoleByIdInput) {}
}
