import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { GoogleOauthGuard } from '@/modules/auth/guards/GoogleOauthGuard';
import { SigninWithGoogleUseCase } from '@/modules/auth/use-case/signin-with-google.use-case';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly signinWithGoogleUseCase: SigninWithGoogleUseCase,
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async signinWithGoogle(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  signinWithGoogleRedirect(@Req() req) {
    return this.signinWithGoogleUseCase.signinWithGoogle(req.user);
  }
}
