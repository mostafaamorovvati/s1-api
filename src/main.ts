import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  const cookieSecret = process.env.COOKIE_SECRET;
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://example.com',
    'http://another-site.com',
  ];
  app.use('/graphql', graphqlUploadExpress());

  const corsOptions: CorsOptions = {
    origin: allowedOrigins, // Replace with the actual origin of your Next.js app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with requests (if needed)
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({}));
  app.use(cookieParser(cookieSecret));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
