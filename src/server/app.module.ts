import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { PrismaService } from '~/server/infrastructure/database/prisma.service';

import { AppController } from '@server/app.controller';
import { AppService } from '@server/app.service';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV !== 'production' }),
      { viewsDir: null },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
