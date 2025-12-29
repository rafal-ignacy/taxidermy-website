import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ContactModule } from './contact/contact.module';
import { ThrottlerCustomGuard } from './common/guards/throttler-custom.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 60 * 1000, // 1 hour
        limit: 1, // 1 request per hour
      },
    ]),
    ContactModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerCustomGuard,
    },
  ],
})
export class AppModule {}


