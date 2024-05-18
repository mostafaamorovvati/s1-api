import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@/common/dtos/output.dto';
import { OtpEntity } from '../entity/otp.entity';

@InputType()
export class CreateOtpInput extends PickType(OtpEntity, [
  'phone',
  'email',
  'code',
] as const) {}

@ObjectType()
export class CreateOtpOutput extends CoreOutput {}
