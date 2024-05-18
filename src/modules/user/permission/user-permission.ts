import { PermissionType } from '@/common/permissions/permission-type';

export class UserPermission {
  static readonly CREATE_USER: PermissionType = {
    name: 'createUser',
    title: 'ایجاد کاربر',
  };

  static readonly UPDATE_USER: PermissionType = {
    name: 'updateUser',
    title: 'آپدیت کاربر',
  };

  static readonly DELETE_USER: PermissionType = {
    name: 'deleteUser',
    title: 'حذف کاربر',
  };

  static readonly CREATE_SELLER: PermissionType = {
    name: 'createSeller',
    title: 'ایجاد فروشنده',
  };

  static readonly UPDATE_SELLER: PermissionType = {
    name: 'updateSeller',
    title: 'آپدیت فروشنده',
  };

  static readonly DELETE_SELLER: PermissionType = {
    name: 'deleteSeller',
    title: 'حذف فروشنده',
  };

  static readonly BULK_DELETE_SELLER: PermissionType = {
    name: 'bulkDeleteSeller',
    title: 'حذف چندتایی فروشنده',
  };
}
