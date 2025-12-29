import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  Logger,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Request as ExpressRequest } from 'express';
import { ContactService } from './contact.service';
import { ContactFormDto } from './dto/contact-form.dto';

@Controller()
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private readonly contactService: ContactService) {}

  @Post('contact-form')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 1, ttl: 60 * 60 * 1000 } })
  async submitContactForm(
    @Body() contactFormDto: ContactFormDto,
    @Request() req: ExpressRequest,
  ) {
    this.logger.log(`Contact form submission from IP: ${req.ip}`);

    await this.contactService.sendContactFormEmails(contactFormDto);

    return { message: 'Email sent successfully' };
  }
}

