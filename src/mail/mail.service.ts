import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmationMail(user: User, token: string | number) {
    const url = `example.com/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: 'test@gmail.com',
      subject:
        'Welcome to Main Blog! Thanks for your support, verify your mail now',
      template: '/confirmation',
      context: {
        name: `${user.firstName} ${user.surName}`,
        url,
      },
    });
  }
}
