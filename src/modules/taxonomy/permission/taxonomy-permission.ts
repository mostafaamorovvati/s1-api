import { PermissionType } from '@/common/permissions/permission-type';

export class TaxonomyPermission {
  static readonly CREATE_TAXONOMY: PermissionType = {
    name: 'createTaxonomy',
    title: 'ایجاد طبقه بندی',
  };

  static readonly UPDATE_TAXONOMY: PermissionType = {
    name: 'updateTaxonomy',
    title: 'آپدیت طبقه بندی',
  };

  static readonly DELETE_TAXONOMY: PermissionType = {
    name: 'deleteTaxonomy',
    title: 'حذف طبقه بندی',
  };
}
