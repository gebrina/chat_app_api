import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    let status = null;
    if (typeof exception.getStatus === 'function') {
      status = exception.getStatus();
    } else {
      status = 500;
    }

    response.status(status).json({
      method: request.method,
      url: request.url,
      status,
      time: new Date().toLocaleDateString(),
      reason: exception?.message,
    });
  }
}
