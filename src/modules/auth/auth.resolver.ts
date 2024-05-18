import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { INITIAL_RESPONSE } from '@/common/constants/initial-response.constant';
import { CoreOutput } from '@/common/dtos/output.dto';
import {
  PermissionMutation,
  PermissionQuery,
} from '@/modules/auth/components/permission/dto/permission.dto';
import {
  RoleMutation,
  RoleQuery,
} from '@/modules/auth/components/role/dto/role.dto';
import { GetRefreshToken } from '@/modules/auth/decorators/get-refresh-token.decorator';
import { GetUser } from '@/modules/auth/decorators/get-user.decorator';
import { AuthMutation, AuthQuery } from '@/modules/auth/dto/auth.dto';
import { LogoutOutput } from '@/modules/auth/dto/logout.dto';
import { RefreshTokenOutput } from '@/modules/auth/dto/refresh-token.dto';
import {
  SigninInput,
  SigninOutput,
  SigninWitOtpInput,
} from '@/modules/auth/dto/signin.dto';
import {
  SignupInput,
  SignupOutput,
  SignupWithPhoneInput,
  SignupWithPhoneOutput,
} from '@/modules/auth/dto/signup.dto';
import { RefreshTokenGuard } from '@/modules/auth/guards/refresh-token.guard';
import { LogoutUseCase } from '@/modules/auth/use-case/logout.use-case';
import { RefreshTokenUseCase } from '@/modules/auth/use-case/refresh-token.use-case';
import { SigninUseCase } from '@/modules/auth/use-case/signin.use-case';
import { SigninWithOtpUseCase } from '@/modules/auth/use-case/signin-with-otp.use-case';
import { SignupUseCase } from '@/modules/auth/use-case/signup.use-case';
import { MailService } from '@/modules/email/mail.service';
import { TUser } from '@/modules/user/entity/user.entity';

import { GetProfileOutput } from './dto/get-profile.dto';
import {
  SetPasswordInput,
  ValidateVerificationCodeInput,
} from './dto/pass-recovery.dto';
import { SendVerificationCodeInput } from './dto/send-verification-code.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { GetProfileUseCase } from './use-case/get-profile.use-case';
import { PassRecoveryUseCase } from './use-case/pass-recovery.use-case';
import { SendVerificationCodeUseCase } from './use-case/send-verification-code.use-case';
import { SetPasswordUseCase } from './use-case/set-user-password.use-case';
import { SignupWithPhoneUseCase } from './use-case/signup-with-phone.use-case';
import { ValidateVerificationCodeUseCase } from './use-case/validate-verification-code.use-case';
import { SigninWithGoogleUseCase } from './use-case/signin-with-google.use-case';

@Resolver(AuthQuery)
export class AuthQueryResolver {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly singinUseCase: SigninUseCase,
    private readonly signinWithOtpUseCase: SigninWithOtpUseCase,
    private readonly validateVerificationCodeUseCase: ValidateVerificationCodeUseCase,
    private readonly emailService: MailService,
    private readonly signinWithGoogleUseCase: SigninWithGoogleUseCase,
  ) {}

  @Query(() => AuthQuery)
  async auth(): Promise<AuthQuery> {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => Boolean)
  async sendMail() {
    return this.emailService.sendEmail('m.shadmobaraki@gmail.com', '123');
  }

  @ResolveField(() => RoleQuery)
  async role() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => PermissionQuery)
  async permission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => SigninOutput)
  async signin(@Args('input') input: SigninInput): Promise<SigninOutput> {
    return this.singinUseCase.signin(input);
  }

  @ResolveField(() => SigninOutput)
  async signinWithOtp(
    @Args('input') input: SigninWitOtpInput,
  ): Promise<SigninOutput> {
    return this.signinWithOtpUseCase.signinWithOtp(input);
  }

  @UseGuards(AccessTokenGuard)
  @ResolveField(() => GetProfileOutput)
  async getProfile(@GetUser() user: TUser): Promise<GetProfileOutput> {
    if (!user) return null;
    return this.getProfileUseCase.getProfile({ id: user._id });
  }

  @ResolveField(() => CoreOutput)
  async validateVerificationCode(
    @Args('input') input: ValidateVerificationCodeInput,
  ): Promise<CoreOutput> {
    return this.validateVerificationCodeUseCase.validateVerificationCode(input);
  }

  @ResolveField(() => SigninOutput)
  async signinWithGoogle(@GetUser() user: TUser) {}

  @ResolveField(() => SigninOutput)
  async signinWithGoogleRedirect(
    @GetUser() user: TUser,
  ): Promise<SigninOutput> {
    return this.signinWithGoogleUseCase.signinWithGoogle(user);
  }
}

@Resolver(AuthMutation)
export class AuthMutationResolver {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly signupWithPhoneUseCase: SignupWithPhoneUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly sendVerificationCodeUseCase: SendVerificationCodeUseCase,
    private readonly setPasswordUseCase: SetPasswordUseCase,
    private readonly passRecoveryWithPhoneUseCase: PassRecoveryUseCase,
  ) {}

  @Mutation(() => AuthMutation)
  async auth(): Promise<AuthMutation> {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => RoleMutation)
  async role() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => PermissionMutation)
  async permission() {
    return INITIAL_RESPONSE;
  }

  @ResolveField(() => SignupOutput)
  async signup(@Args('input') signupInput: SignupInput): Promise<SignupOutput> {
    return this.signupUseCase.signup(signupInput);
  }

  @ResolveField(() => SignupWithPhoneOutput)
  async signupWithPhone(
    @Args('input') input: SignupWithPhoneInput,
  ): Promise<SignupWithPhoneOutput> {
    return this.signupWithPhoneUseCase.signupWithPhone(input);
  }

  @UseGuards(RefreshTokenGuard)
  @ResolveField(() => LogoutOutput)
  async logout(
    @GetUser() user: TUser,
    @GetRefreshToken() refreshToken: string,
  ): Promise<LogoutOutput> {
    return this.logoutUseCase.logout(user._id, refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @ResolveField(() => RefreshTokenOutput)
  async refreshToken(
    @GetUser() user: TUser,
    @GetRefreshToken() refreshToken: string,
  ): Promise<RefreshTokenOutput> {
    const userId = user._id;
    return this.refreshTokenUseCase.refreshToken(userId, refreshToken);
  }

  @ResolveField(() => CoreOutput)
  async setPassword(
    @Args('input') input: SetPasswordInput,
  ): Promise<CoreOutput> {
    return this.setPasswordUseCase.setPassword(input);
  }

  @ResolveField(() => CoreOutput)
  async sendVerificationCode(
    @Args('input') input: SendVerificationCodeInput,
  ): Promise<CoreOutput> {
    return this.sendVerificationCodeUseCase.sendVerificationCode(input);
  }

  @ResolveField(() => CoreOutput)
  async passRecoveryWithPhone(
    @Args('input') input: SetPasswordInput,
  ): Promise<CoreOutput> {
    return this.passRecoveryWithPhoneUseCase.passRecovery(input);
  }
}

export const AuthResolvers = [AuthQueryResolver, AuthMutationResolver];
