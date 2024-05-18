import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindPermissionByIdsUseCase } from '@/modules/auth/components/permission/use-case/find-permission-by-ids.use-case';
import { FindRoleByIdsUseCase } from '@/modules/auth/components/role/use-case/find-role-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class UserDataLoader {
  constructor(
    private readonly findPermissionByIdsUseCase: FindPermissionByIdsUseCase,
    private readonly findRoleByIdsUseCase: FindRoleByIdsUseCase,
  ) {}

  public readonly batchPermission = new DataLoader(
    async (permissionList: readonly string[][]) => {
      const ids = [...new Set(permissionList.flat())];
      const permissions =
        await this.findPermissionByIdsUseCase.findPermissionByids({ ids: ids });

      const permissionsMap = new Map(
        permissions.results.map(permission => [
          permission._id.toString(),
          permission,
        ]),
      );
      const data = permissionList.map(pIds => {
        const finalPermissions = pIds.map(pId => permissionsMap.get(pId));

        return finalPermissions;
      });
      return data;
    },
  );

  public readonly batchRole = new DataLoader(
    async (roleList: readonly string[][]) => {
      const ids = [...new Set(roleList.flat())];
      const roles = await this.findRoleByIdsUseCase.findRoleByids({
        ids: ids,
      });

      const rolesMap = new Map(
        roles.results.map(role => [role._id.toString(), role]),
      );
      const data = roleList.map(pIds => {
        const finalRoles = pIds.map(roleId => rolesMap.get(roleId));

        return finalRoles;
      });
      return data;
    },
  );
}
