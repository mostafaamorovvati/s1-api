import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { FindPermissionByIdsUseCase } from '@/modules/auth/components/permission/use-case/find-permission-by-ids.use-case';

@Injectable({ scope: Scope.REQUEST })
export default class RoleDataLoader {
  constructor(
    private readonly findPermissionByIdsUseCase: FindPermissionByIdsUseCase,
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
}
