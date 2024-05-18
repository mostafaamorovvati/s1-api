import { PermissionPermit } from '@/modules/auth/components/permission/permission/permission-permit';
import { RolePermission } from '@/modules/auth/components/role/permission/role-permission';
import { TaxonomyPermission } from '@/modules/taxonomy/permission/taxonomy-permission';
import { UserPermission } from '@/modules/user/permission/user-permission';

export class PermissionType {
  name: string;
  title: string;
}

export class Permission {
  static readonly CREATE: PermissionType = { name: 'create', title: 'ایجاد' };
  static readonly UPDATE: PermissionType = { name: 'update', title: 'آپدیت' };
  static readonly DELETE: PermissionType = { name: 'delete', title: 'حذف' };
  static readonly READ: PermissionType = { name: 'read', title: 'خواندن' };
  static readonly BULK_DELETE: PermissionType = {
    name: 'bulkDelete',
    title: 'حذف چندتایی',
  };

  static readonly CREATE_USER = UserPermission.CREATE_USER;
  static readonly UPDATE_USER = UserPermission.UPDATE_USER;
  static readonly DELETE_USER = UserPermission.DELETE_USER;

  static readonly CREATE_PERMISSION = PermissionPermit.CREATE_PERMISSION;
  static readonly UPDATE_PERMISSION = PermissionPermit.UPDATE_PERMISSION;
  static readonly DELETE_PERMISSION = PermissionPermit.DELETE_PERMISSION;
  static readonly BULK_DELETE_PERMISSION =
    PermissionPermit.BULK_DELETE_PERMISSION;

  static readonly CREATE_ROLE = RolePermission.CREATE_ROLE;
  static readonly UPDATE_ROLE = RolePermission.UPDATE_ROLE;
  static readonly DELETE_ROLE = RolePermission.DELETE_ROLE;
  static readonly BULK_DELETE_ROLE = RolePermission.BULK_DELETE_ROLE;

  static readonly CREATE_TAXONOMY = TaxonomyPermission.CREATE_TAXONOMY;
  static readonly UPDATE_TAXONOMY = TaxonomyPermission.UPDATE_TAXONOMY;
  static readonly DELETE_TAXONOMY = TaxonomyPermission.DELETE_TAXONOMY;

  static readonly CREATE_SELLER = UserPermission.CREATE_SELLER;
  static readonly UPDATE_SELLER = UserPermission.UPDATE_SELLER;
  static readonly DELETE_SELLER = UserPermission.DELETE_SELLER;
  static readonly BULK_DELETE_SELLER = UserPermission.BULK_DELETE_SELLER;
}
