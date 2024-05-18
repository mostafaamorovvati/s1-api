import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class DeletePermissionInput {
  @Field(() => String)
  @IsObjectId()
  permissionId: string;
}

@InputType()
export class BulkDeletePermissionInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@ObjectType()
export class DeletePermissionOutput extends CoreOutput {}
