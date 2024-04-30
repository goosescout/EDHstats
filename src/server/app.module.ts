import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { RenderController } from '@server/application/controllers/render.controller';
import { CommandersModule } from '@server/domain/commanders/commanders.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production' }),
      { passthrough404: true, viewsDir: null },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CommandersModule,
  ],
  controllers: [RenderController],
})
export class AppModule {}
