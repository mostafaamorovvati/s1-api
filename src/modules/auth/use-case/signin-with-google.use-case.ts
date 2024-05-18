// user-registration.use-case.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SigninOutput } from '@/modules/auth/dto/signin.dto';
import { SigninWithGoogleQuery } from '@/modules/auth/query/signin-with-google/signin-with-google.query';

@Injectable()
export class SigninWithGoogleUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  async signinWithGoogle(user: any): Promise<SigninOutput> {
    try {
      if (!user) {
        throw new BadRequestException('Unauthenticated');
      }

      const object = await this.queryBus.execute(
        new SigninWithGoogleQuery(user),
      );
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
