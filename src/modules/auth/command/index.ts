import { LogoutHandler } from '@/modules/auth/command/logout/logout.handler';
import { RefreshTokenHandler } from '@/modules/auth/command/refresh-token/refresh-token.handler';
import { SignupHandler } from '@/modules/auth/command/signup/signup.handler';
import { SignupWithPhoneHandler } from './signup-with-phone/signup-with-phone.handler';

export const CommandHandlers = [
  SignupHandler,
  LogoutHandler,
  RefreshTokenHandler,
  SignupWithPhoneHandler,
];
