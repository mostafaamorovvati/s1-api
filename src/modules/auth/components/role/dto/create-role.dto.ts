import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { RoleEntity } from '@/modules/auth/components/role/entity/role.entity';
import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateRoleInput extends PickType(RoleEntity, [
  'name',
  'title',
] as const) {
  @Field(() => [String], { nullable: true })
  @IsObjectId({ each: true })
  @IsOptional()
  permissions?: string[];
}

@ObjectType()
export class CreateRoleOutput extends CoreOutput {}
