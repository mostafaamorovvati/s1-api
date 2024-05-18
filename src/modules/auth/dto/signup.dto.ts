import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

import { CoreOutput } from '@/common/dtos/output.dto';
import { UserEntity } from '@/modules/user/entity/user.entity';

@InputType()
export class SignupInput extends PickType(UserEntity, [
  'email',
  'displayName',
  'phone',
] as const) {
  @Field(() => String)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  })
  password: string;
}

@InputType()
export class SignupWithPhoneInput extends PickType(UserEntity, ['phone']) {}

@ObjectType()
export class SignupOutput extends CoreOutput {}

@ObjectType()
export class SignupWithPhoneOutput extends CoreOutput {}
