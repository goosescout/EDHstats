import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { RenderService } from 'nest-next';

import { PORT } from '~/shared/constants/env';

import { AnalyticsModule } from '@server/domain/analytics/analytics.module';
import { AuthModule } from '@server/domain/auth/auth.module';
import { CommandersModule } from '@server/domain/commanders/commanders.module';
import { JwtInterceptor } from '@server/infrastructure/interceptors/jwt.interceptor';
import { TimingInterceptor } from '@server/infrastructure/interceptors/timing.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.useGlobalInterceptors(new TimingInterceptor());
  app.useGlobalInterceptors(new JwtInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('EDHstats')
    .setDescription('EDHstats API description')
    .setVersion('1.0')
    .build();
  const option: SwaggerDocumentOptions = {
    include: [CommandersModule, AnalyticsModule, AuthModule],
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, option);
  SwaggerModule.setup('api', app, document);

  const renderService = app.get(RenderService);
  renderService.setErrorHandler(async (err, _req, res) => {
    if (res.statusCode !== 404) res.send(err.response);
  });

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
