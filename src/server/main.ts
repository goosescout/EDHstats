import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { PORT } from '~/shared/constants/env';

import { TimingInterceptor } from '@server/application/interceptors/timing.interceptor';
import { CommandersModule } from '@server/domain/commanders/commanders.module';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new TimingInterceptor());

  const config = new DocumentBuilder()
    .setTitle('EDHstats')
    .setDescription('EDHstats API description')
    .setVersion('1.0')
    .build();
  const option: SwaggerDocumentOptions = {
    include: [CommandersModule],
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, option);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
