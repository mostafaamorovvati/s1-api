import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class FindUserByIdInput {
  @Field(() => String)
  @IsObjectId()
  id: string;
}

@InputType()
export class FindUserByEmailInput {
  @Field(() => String)
  @IsEmail()
  @IsString()
  email: string;
}

@InputType()
export class FindUserByPhoneInput {
  @Field(() => String, { nullable: true })
  @ValidateIf(o => !o.email)
  @IsPhoneNumber('IR')
  @IsString()
  phone?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(o => !o.phone)
  @IsEmail()
  @IsString()
  email?: string;
}

@InputType()
export class FindUsersByRoleInput {
  @Field(() => String)
  @IsObjectId()
  roleId: string;
}

@ObjectType()
export class FindUserOutput extends CoreOutput {
  @Field(() => UserEntity, { nullable: true })
  result?: UserEntity;
}

@ObjectType()
export class FindManyUserOutput extends CoreOutput {
  @Field(() => [UserEntity], { nullable: true })
  results?: UserEntity[];
}
