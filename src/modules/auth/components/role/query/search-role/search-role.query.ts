import { SearchRoleInput } from '@/modules/auth/components/role/dto/search-role.dto';

export class SearchRoleQuery {
  constructor(readonly searchRoleInput: SearchRoleInput) {}
}
