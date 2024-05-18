// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { OtpModel } from '@/modules/auth/components/otp/model/otp.model';
import { FindOtpByEmailQuery } from '@/modules/auth/components/otp/query/find-otp-by-email.query.ts/find-otp-by-email.query';
import { FindOtpByPhoneQuery } from '@/modules/auth/components/otp/query/find-otp-by-phone/find-otp-by-phone.query';
import {
  EMAIL_NOT_FOUND,
  ENTERED_CODE_IS_INCORRECT,
  PHONE_NOT_FOUND,
} from '@/modules/auth/constants/error-message.constant';
import { SigninOutput, SigninWitOtpInput } from '@/modules/auth/dto/signin.dto';
import { SigninWithOtpQuery } from '@/modules/auth/query/signin-with-otp/signin-with-otp.query';
import { UpdateUserCommand } from '@/modules/user/command/update-user/update-user.command';
import { UserModel } from '@/modules/user/model/user.model';
import { FindUserByEmailQuery } from '@/modules/user/query/find-user-by-email/find-user-by-email.query';
import { FindUserByPhoneQuery } from '@/modules/user/query/find-user-by-phone/find-user-by-phone.query';

import { DeleteOtpCommand } from '../components/otp/command/delete-otp/delete-otp.command';

@Injectable()
export class SigninWithOtpUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async signinWithOtp({
    phone,
    email,
    code,
  }: SigninWitOtpInput): Promise<SigninOutput> {
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

      const isValid = code && (await otp.validateCode(code));

      if (!isValid) throw new BadRequestException(ENTERED_CODE_IS_INCORRECT);

      const object = await this.queryBus.execute(
        new SigninWithOtpQuery(phone, email),
      );

      await this.commandBus.execute(
        new UpdateUserCommand({ userId: user.getId(), isVerified: true }),
      );

      await this.commandBus.execute(new DeleteOtpCommand({ id: otp.getId() }));

      return {
        success: true,
        accessToken: object.accessToken,
        refreshToken: object.refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
