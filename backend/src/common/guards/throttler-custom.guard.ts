import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class ThrottlerCustomGuard extends ThrottlerGuard {
  private readonly logger = new Logger(ThrottlerCustomGuard.name);

  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Get IP from nginx headers (x-real-ip or x-forwarded-for)
    const xRealIp = req.headers?.['x-real-ip'];
    if (typeof xRealIp === 'string' && xRealIp.length > 0) {
      return xRealIp;
    }
    if (Array.isArray(xRealIp) && xRealIp.length > 0) {
      return xRealIp[0];
    }

    const xForwardedFor = req.headers?.['x-forwarded-for'];
    if (typeof xForwardedFor === 'string' && xForwardedFor.length > 0) {
      return xForwardedFor.split(',')[0].trim();
    }
    if (Array.isArray(xForwardedFor) && xForwardedFor.length > 0) {
      return String(xForwardedFor[0]).split(',')[0].trim();
    }

    return req.ip || 'unknown';
  }

  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: any,
  ): Promise<void> {
    const request = context.switchToHttp().getRequest<Request>();
    const tracker = await this.getTracker(request);
    this.logger.warn(`Rate limit exceeded: ${tracker}`);
    await super.throwThrottlingException(context, throttlerLimitDetail);
  }
}

