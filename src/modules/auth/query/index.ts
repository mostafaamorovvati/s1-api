import { SigninHandler } from '@/modules/auth/query/signin-query/signin-handler';

import { GetProfileHandler } from './get-profile/get-profile.handler';
import { SigninWithOtpHandler } from './signin-with-otp/signin-with-otp.handler';
import { SigninWithGoogleHandler } from './signin-with-google/signin-with-google.handler';

export const QueryHandlers = [
  SigninHandler,
  GetProfileHandler,
  SigninWithOtpHandler,
  SigninWithGoogleHandler,
];
