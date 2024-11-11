import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, username: string): Promise<void> {
    const text = `Hello ${username},\n\nThank you for registering. We are glad to have you!`;
    const html = `<p>Hello <strong>${username}</strong>,</p><p>Thank you for registering. We are glad to have you!</p>`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm account registration',
      text: text,
      html: html,
    });
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string,
  ): Promise<void> {
    const text = `You have requested a password reset. Your confirmation code:\n\n${resetToken}`;
    const html = `<p>You have requested a password reset. Your confirmation code:\n\n${resetToken}</p>`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: text,
      html: html,
    });
  }
}
