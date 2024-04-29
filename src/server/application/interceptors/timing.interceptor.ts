import { ServerResponse } from 'http';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime.bigint();
    return next.handle().pipe(
      finalize(() => {
        const res = context.switchToHttp().getResponse<ServerResponse>();
        res.setHeader(
          'x-render-time',
          Number(process.hrtime.bigint() - start) / 1e6,
        );
      }),
    );
  }
}
