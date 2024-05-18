import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';

@InputType()
export class FindRoleByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindRoleByIdsInput {
  @Field(() => [String])
  @IsObjectId({ each: true })
  ids: string[];
}

@InputType()
export class FindRoleByNameInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class FindRoleOutput extends CoreOutput {
  @Field(() => RoleEntity, { nullable: true })
  result?: RoleEntity;
}

@ObjectType()
export class FindManyRolesOutput extends CoreOutput {
  @Field(() => [RoleEntity], { nullable: true })
  results?: RoleEntity[];
}
