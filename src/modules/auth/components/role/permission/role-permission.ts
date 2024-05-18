import { PermissionType } from '@/common/permissions/permission-type';

export class RolePermission {
  static readonly CREATE_ROLE: PermissionType = {
    name: 'createRole',
    title: 'ایجاد نقش',
  };

  static readonly UPDATE_ROLE: PermissionType = {
    name: 'updateRole',
    title: 'آپدیت نقش',
  };

  static readonly DELETE_ROLE: PermissionType = {
    name: 'deleteRole',
    title: 'حذف نقش',
  };

  static readonly BULK_DELETE_ROLE: PermissionType = {
    name: 'bulkDeleteRole',
    title: 'حذف چندتایی نقش',
  };
}
