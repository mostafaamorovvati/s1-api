import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: process.env.GOOGLE_CALLBACK_URL,
      callbackURL: 'http://localhost:4000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const firstName = name.givenName ? name.givenName : '';
    const lastNameName = name.familyName ? name.familyName : '';
    const displayName = `${firstName} ${lastNameName}`;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      displayName: displayName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
      provider: 'google',
      googleId: id,
    };
    done(null, user);
  }
}
