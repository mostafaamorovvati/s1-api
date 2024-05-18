import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, code: string): Promise<boolean> {
    try {
      this.mailerService.sendMail({
        to: email,
        from: 'noreply@egybi.com',
        subject: 'اگیبی',
        text: `کد تایید شما : ${code}`,
      });
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }
}
