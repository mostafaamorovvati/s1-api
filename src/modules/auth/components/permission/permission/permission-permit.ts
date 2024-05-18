import { PermissionType } from '@/common/permissions/permission-type';

export class PermissionPermit {
  static readonly CREATE_PERMISSION: PermissionType = {
    name: 'createPermission',
    title: 'ایجاد مجوز',
  };

  static readonly UPDATE_PERMISSION: PermissionType = {
    name: 'updatePermission',
    title: 'آپدیت مجوز',
  };

  static readonly DELETE_PERMISSION: PermissionType = {
    name: 'deletePermission',
    title: 'حذف مجوز',
  };

  static readonly BULK_DELETE_PERMISSION: PermissionType = {
    name: 'bulkDeletePermission',
    title: 'حذف چندتایی مجوز',
  };
}
