import { ServerResponse } from 'http';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, finalize } from 'rxjs';

import { TIMING_HEADER } from '~/shared/constants';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime.bigint();
    return next.handle().pipe(
      finalize(() => {
        const res = context.switchToHttp().getResponse<ServerResponse>();
        res.setHeader(
          TIMING_HEADER,
          Number(process.hrtime.bigint() - start) / 1e6,
        );
      }),
    );
  }
}
