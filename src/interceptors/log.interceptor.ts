import { Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request: Request = context.switchToHttp().getRequest();
		// request.
		const now = Date.now();
		return next
			.handle()
			.pipe(
				tap(() => console.log(`${request.method} ${request.path} ${Date.now() - now}ms`)),
			);
	}
}
