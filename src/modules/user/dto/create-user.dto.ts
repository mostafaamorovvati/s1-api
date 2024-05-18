import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsOptional, Matches } from 'class-validator';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class CreateUserInput extends PickType(UserEntity, [
  'email',
  'phone',
  'displayName',
  'isVerified',
  'refreshToken',
] as const) {
  @Field(() => String)
  @IsOptional()
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  })
  password: string;

  @Field(() => [String], { nullable: true })
  @IsObjectId({ each: true })
  @IsOptional()
  permissions?: string[];

  @Field(() => [String], { nullable: true })
  @IsObjectId({ each: true })
  @IsOptional()
  roles?: string[];
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
