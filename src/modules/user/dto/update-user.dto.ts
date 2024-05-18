import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsOptional, Matches } from 'class-validator';

import { IsObjectId } from '@/common/decorators/is-object-id.decorator';
import { CoreOutput } from '@/common/dtos/output.dto';
import { CreateUserInput } from '@/modules/user/dto/create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  @IsObjectId()
  userId: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @IsObjectId()
  userId: string;

  @Field(() => String)
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'رمز عبور باید حداقل 6 کاراکتر ، حداقل یک حرف و یک عدد داشته باشد',
  })
  password: string;
}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}
