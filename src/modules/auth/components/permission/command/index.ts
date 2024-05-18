import { BulkDeletePermissionHandler } from '@/modules/auth/components/permission/command/bulk-delete-permission/bulk-delete-permission.handler';
import { CreatePermissionHandler } from '@/modules/auth/components/permission/command/create-permission/create-permission.handler';
import { DeletePermissionHandler } from '@/modules/auth/components/permission/command/delete-permission/delete-permission.handler';
import { UpdatePermissionHandler } from '@/modules/auth/components/permission/command/update-permission/update-permission.handler';

export const CommandHandlers = [
  CreatePermissionHandler,
  UpdatePermissionHandler,
  DeletePermissionHandler,
  BulkDeletePermissionHandler,
];
