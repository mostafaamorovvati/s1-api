import { FindRoleByIdHanler } from '@/modules/auth/components/role/query/find-role-by-id/find-role-by-id.handler';
import { FindRoleByIdsHanler } from '@/modules/auth/components/role/query/find-role-by-ids/find-role-by-ids.handler';
import { FindRoleByNameHanler } from '@/modules/auth/components/role/query/find-role-by-name/find-role-by-name.handler';
import { SearchRoleHanler } from '@/modules/auth/components/role/query/search-role/search-role.handler';

export const QueryHandlers = [
  SearchRoleHanler,
  FindRoleByIdHanler,
  FindRoleByIdsHanler,
  FindRoleByNameHanler,
];
