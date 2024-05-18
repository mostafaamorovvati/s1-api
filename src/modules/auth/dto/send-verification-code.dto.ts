import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';

@InputType()
export class SendVerificationCodeInput {
  @Field(() => String, { nullable: true })
  @ValidateIf(o => !o.email)
  @IsString()
  @IsPhoneNumber('IR')
  phone?: string;

  @Field(() => String, { nullable: true })
  @ValidateIf(o => !o.phone)
  @IsString()
  @IsEmail()
  email?: string;
}
