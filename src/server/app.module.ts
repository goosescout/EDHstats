import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { RenderController } from '@server/application/controllers/render.controller';
import { CommandersModule } from '@server/domain/commanders/commanders.module';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production' }),
      { viewsDir: null },
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
