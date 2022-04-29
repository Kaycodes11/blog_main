import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: `smtp.example.com`,
        secure: false,
        auth: {
          user: 'user@example.com',
          pass: '121212',
        },
      },
      defaults: { from: `${'no Reply'} <noreply@example.com>` },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // new PugAdapter / new EjsAdapter()
        options: { strict: true },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
