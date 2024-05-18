import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';

@InputType()
export class CreatePermissionInput extends PickType(PermissionEntity, [
  'name',
  'title',
] as const) {}

@ObjectType()
export class CreatePermissionOutput extends CoreOutput {}
