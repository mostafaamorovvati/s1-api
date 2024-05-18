import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreatePermissionInput } from '@/modules/auth/components/permission/dto/create-permission.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => String)
  @IsObjectId()
  permissionId: string;
}

@ObjectType()
export class UpdatePermissionOutput extends CoreOutput {}
