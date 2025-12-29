import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Trust proxy to get real IP from nginx
  app.getHttpAdapter().getInstance().set('trust proxy', true);

  // CORS configuration
  app.enableCors({
    origin: 'https://taxidermypoland.com',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Content-Length'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get<number>('HTTP_PORT', 3000);
  await app.listen(port);
  console.log(`HTTP server is running on port ${port}`);
}

bootstrap();

