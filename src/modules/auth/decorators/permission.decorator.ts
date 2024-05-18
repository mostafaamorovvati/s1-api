import { SetMetadata } from '@nestjs/common';

import { PERMISSION_KEY } from '@/modules/auth/constants/common.constant';
import { PermissionType } from '@/common/permissions/permission-type';

export const Permissions = (...permission: PermissionType[]) =>
  SetMetadata(PERMISSION_KEY, permission);
