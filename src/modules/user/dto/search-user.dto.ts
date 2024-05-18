import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import {
  PaginationInput,
  PaginationOutput,
} from '@/common/dtos/pagination.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType('SearchUserInput')
export class SearchUserInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  text?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  displayName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  roles?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  permissions?: string[];
}

@ObjectType('SearchUserOutput')
export class SearchUserOutput extends PaginationOutput {
  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];
}
