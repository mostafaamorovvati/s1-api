import { BulkDeleteRoleHandler } from '@/modules/auth/components/role/command/bulk-delete-role/bulk-delete-role.handler';
import { CreateRoleHandler } from '@/modules/auth/components/role/command/create-role/create-role.handler';
import { DeleteRoleHandler } from '@/modules/auth/components/role/command/delete-role/delete-role.handler';
import { UpdateRoleHandler } from '@/modules/auth/components/role/command/update-role/update-role.handler';

export const CommandHandlers = [
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
  BulkDeleteRoleHandler,
];
