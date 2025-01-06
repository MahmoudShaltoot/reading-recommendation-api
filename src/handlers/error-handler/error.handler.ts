import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch() // This decorator catches all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception instanceof HttpException ? exception.getStatus() : 500;

		const message =
			exception instanceof HttpException
				? exception.getResponse()
				: 'Internal server error';

		// TO-DO
		// Send webhook to error tracking tool (sentry, ...)

		// Send the error response
		response.status(status).json({
			statusCode: status,
			message: message,
			timestamp: new Date().toISOString(),
		});
	}
}
