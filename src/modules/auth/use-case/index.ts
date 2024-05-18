import { LogoutUseCase } from '@/modules/auth/use-case/logout.use-case';
import { RefreshTokenUseCase } from '@/modules/auth/use-case/refresh-token.use-case';
import { SigninUseCase } from '@/modules/auth/use-case/signin.use-case';
import { SigninWithOtpUseCase } from '@/modules/auth/use-case/signin-with-otp.use-case';
import { SignupUseCase } from '@/modules/auth/use-case/signup.use-case';

import { GetProfileUseCase } from './get-profile.use-case';
import { PassRecoveryUseCase } from './pass-recovery.use-case';
import { SendVerificationCodeUseCase } from './send-verification-code.use-case';
import { SetPasswordUseCase } from './set-user-password.use-case';
import { SignupWithPhoneUseCase } from './signup-with-phone.use-case';
import { ValidateVerificationCodeUseCase } from './validate-verification-code.use-case';
import { SigninWithGoogleUseCase } from './signin-with-google.use-case';

export const UseCases = [
  SignupUseCase,
  SigninUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
  SigninWithOtpUseCase,
  GetProfileUseCase,
  PassRecoveryUseCase,
  SignupWithPhoneUseCase,
  ValidateVerificationCodeUseCase,
  SendVerificationCodeUseCase,
  SetPasswordUseCase,
  SigninWithGoogleUseCase,
];
