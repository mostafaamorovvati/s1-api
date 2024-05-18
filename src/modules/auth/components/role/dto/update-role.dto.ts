import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateRoleInput } from '@/modules/auth/components/role/dto/create-role.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => String)
  @IsObjectId()
  roleId: string;
}

@ObjectType()
export class UpdateRoleOutput extends CoreOutput {}
