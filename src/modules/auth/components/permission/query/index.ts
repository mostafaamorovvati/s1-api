import { FindPermissionByIdHanler } from '@/modules/auth/components/permission/query/find-permission-by-id/find-permission-by-id.handler';
import { FindPermissionByIdsHanler } from '@/modules/auth/components/permission/query/find-permission-by-ids/find-permission-by-ids.handler';
import { FindPermissionByNameHanler } from '@/modules/auth/components/permission/query/find-permission-by-name/find-permission-by-name.handler';
import { SearchPermissionHanler } from '@/modules/auth/components/permission/query/search-permission/search-permission.handler';

export const QueryHandlers = [
  SearchPermissionHanler,
  FindPermissionByIdHanler,
  FindPermissionByIdsHanler,
  FindPermissionByNameHanler,
];
