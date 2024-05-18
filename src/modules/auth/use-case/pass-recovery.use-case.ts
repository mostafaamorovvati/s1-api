// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CoreOutput } from '@/common/dtos/output.dto';
import { OtpModel } from '@/modules/auth/components/otp/model/otp.model';
import { FindOtpByEmailQuery } from '@/modules/auth/components/otp/query/find-otp-by-email.query.ts/find-otp-by-email.query';
import { FindOtpByPhoneQuery } from '@/modules/auth/components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import {
  EMAIL_NOT_FOUND,
  ENTERED_CODE_IS_INCORRECT,
  PHONE_NOT_FOUND,
} from '@/modules/auth/constants/error-message.constant';
import { UpdatePasswordCommand } from '@/modules/user/command/update-password/update-password.command';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailQuery } from '@/modules/user/query/find-user-by-email/find-user-by-email.query';
import { FindUserByPhoneQuery } from '@/modules/user/query/find-user-by-phone/find-user-by-phone.query';

import { DeleteOtpCommand } from '../components/otp/command/delete-otp/delete-otp.command';
import { SetPasswordInput } from '../dto/pass-recovery.dto';

@Injectable()
export class PassRecoveryUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async passRecovery({
    phone,
    email,
    verificationCode,
    password,
  }: SetPasswordInput): Promise<CoreOutput> {
    try {
      let user: UserModel;
      if (phone) {
        user = await this.queryBus.execute(new FindUserByPhoneQuery(phone));
        if (!user) throw new NotFoundException(PHONE_NOT_FOUND);
      } else if (email) {
        user = await this.queryBus.execute(new FindUserByEmailQuery(email));
        if (!user) throw new NotFoundException(EMAIL_NOT_FOUND);
      }

      let otp: OtpModel;
      if (phone) {
        otp = await this.queryBus.execute(new FindOtpByPhoneQuery(phone));
      } else if (email) {
        otp = await this.queryBus.execute(new FindOtpByEmailQuery(email));
      }

      const isValid =
        verificationCode && (await otp.validateCode(verificationCode));

      if (!isValid) throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      await this.commandBus.execute(
        new UpdatePasswordCommand(user.getId(), password),
      );

      await this.commandBus.execute(new DeleteOtpCommand({ id: otp.getId() }));

      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
