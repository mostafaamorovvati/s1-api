import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class DeleteRoleInput {
  @Field(() => String)
  @IsObjectId()
  roleId: string;
}

@InputType()
export class BulkDeleteRoleInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeleteRoleOutput extends CoreOutput {}
