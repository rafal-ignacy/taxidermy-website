import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter, SendMailOptions, TransportOptions } from 'nodemailer';
import { ContactFormDto } from './dto/contact-form.dto';

interface SmtpConfig extends TransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly transporter: Transporter;

  constructor(
    private configService: ConfigService,
  ) {
    const smtpServerConfig: SmtpConfig = {
      host: this.configService.get<string>('SMTP_SERVER')!,
      port: parseInt(this.configService.get<string>('SMTP_PORT')!, 10),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_LOGIN')!,
        pass: this.configService.get<string>('EMAIL_PASSWORD')!,
      },
    };
    this.transporter = nodemailer.createTransport(smtpServerConfig);
  }

  private async sendEmail(mailOptions: SendMailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(
        `Email was sent: ${info.messageId} - ${info.response}`,
      );
    } catch (error) {
      this.logger.error(
        `Error occurred during email sending attempt: ${error}`,
      );
      throw error;
    }
  }

  async sendContactFormEmails(contactFormDto: ContactFormDto): Promise<void> {
    const { fullName, email, message } = contactFormDto;

    const senderEmail = this.configService.get<string>('SENDER_EMAIL')!;
    const recipientEmail = this.configService.get<string>('RECIPIENT_EMAIL')!;

    // Email to website owner
    const mailFromWebsiteOptions: SendMailOptions = {
      from: senderEmail,
      to: recipientEmail,
      subject: 'Mail from taxidermypoland.com',
      html: `
        <b>Full name:</b> ${fullName}<br/>
        <b>Email:</b> ${email}<br/>
        <b>Message:</b> ${message}`,
    };

    // Confirmation email to customer
    const mailToCustomerOptions: SendMailOptions = {
      from: senderEmail,
      to: email,
      subject: 'Taxidermy Poland - confirmation of your message submission',
      html: `
        Hello ${fullName},<br/>
        <br/>
        Thank you for contacting us! We've successfully received your message, and we'll get back to you as soon as possible.<br/>
        <br/>
        Here is a quick recap what you sent us:<br/>
        <b>Fullname:</b> ${fullName}<br/>
        <b>Email:</b> ${email}<br/>
        <b>Message:</b> ${message}<br/>
        <br/>
        We appreciate your interest, and we'll be in touch soon!<br/>
        <br/>
        Best regards,<br/>
        Taxidermy Poland`,
    };

    await this.sendEmail(mailFromWebsiteOptions);
    await this.sendEmail(mailToCustomerOptions);
  }
}

