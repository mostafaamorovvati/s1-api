import { SearchPermissionInput } from '@/modules/auth/components/permission/dto/search-permission.dto';

export class SearchPermissionQuery {
  constructor(readonly searchPermissionInput: SearchPermissionInput) {}
}
