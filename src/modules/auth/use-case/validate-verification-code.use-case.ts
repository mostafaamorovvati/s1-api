// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { CoreOutput } from '@/common/dtos/output.dto';
import { FindOtpByEmailQuery } from '@/modules/auth/components/otp/query/find-otp-by-email.query.ts/find-otp-by-email.query';

import { OtpModel } from '../components/otp/model/otp.model';
import { FindOtpByPhoneQuery } from '../components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import { ENTERED_CODE_IS_INCORRECT } from '../constants/error-message.constant';
import { ValidateVerificationCodeInput } from '../dto/pass-recovery.dto';

@Injectable()
export class ValidateVerificationCodeUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async validateVerificationCode({
    phone,
    email,
    code,
  }: ValidateVerificationCodeInput): Promise<CoreOutput> {
    try {
      let otp: OtpModel;
      if (phone) {
        otp = await this.queryBus.execute(new FindOtpByPhoneQuery(phone));
      } else if (email) {
        otp = await this.queryBus.execute(new FindOtpByEmailQuery(email));
      }
      const isValid = code && (await otp.validateCode(code));
      if (!isValid) throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
