/* eslint-disable @typescript-eslint/ban-types */
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaClient as PrismaClientProd } from '@prisma/client';
import { PrismaClient as PrismaClientTest } from 'prisma/client-test';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaProd: PrismaClientProd;
  private prismaTest: PrismaClientTest;

  constructor(@Inject(REQUEST) private request: Request) {
    this.prismaProd = new PrismaClientProd();
    this.prismaTest = new PrismaClientTest();
  }

  get client() {
    return new Proxy(this.prismaProd, {
      get: (_, prop: keyof PrismaClientProd) => {
        const client =
          this.request.headers['x-testing-enabled'] === 'True'
            ? this.prismaTest
            : this.prismaProd;
        if (typeof client[prop] === 'function') {
          return (client[prop] as Function).bind(client);
        } else {
          return client[prop];
        }
      },
    });
  }

  async onModuleInit() {
    await this.prismaProd.$connect();
    await this.prismaTest.$connect();
  }

  async onModuleDestroy() {
    await this.prismaProd.$disconnect();
    await this.prismaTest.$disconnect();
  }
}
