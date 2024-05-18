import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { PermissionEntity } from '@/modules/auth/components/permission/entity/permission.entity';

@InputType('SearchPermissionInput')
export class SearchPermissionInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;
}

@ObjectType('SearchPermissionOutput')
export class SearchPermissionOutput extends PaginationOutput {
  @Field(() => [PermissionEntity], { nullable: true })
  results?: PermissionEntity[];
}
