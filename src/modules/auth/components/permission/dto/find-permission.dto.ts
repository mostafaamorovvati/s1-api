import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class FindPermissionByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindPermissionByIdsInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@InputType()
export class FindPermissionByNameInput {
  @Field(() => String)
  name: string;
}
@ObjectType()
export class FindPermissionOutput extends CoreOutput {
  @Field(() => PermissionEntity, { nullable: true })
  result?: PermissionEntity;
}

@ObjectType()
export class FindManyPermissionsOutput extends CoreOutput {
  @Field(() => [PermissionEntity], { nullable: true })
  results?: PermissionEntity[];
}
