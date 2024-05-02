import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { RenderController } from '@server/application/controllers/render.controller';
import { AnalyticsModule } from '@server/domain/analytics/analytics.module';
import { AuthModule } from '@server/domain/auth/auth.module';
import { CommandersModule } from '@server/domain/commanders/commanders.module';

import { SchedulerService } from './infrastructure/schedule/scheduler.service';

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
    AnalyticsModule,
    AuthModule,
  ],
  controllers: [RenderController],
  providers: [SchedulerService],
})
export class AppModule {}
