import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(error: Error | HTTPError, request: Request, response: Response, next: NextFunction): void {
		if (error instanceof HTTPError) {
			this.logger.error(`Context: ${error.context} Error: ${error.statusCode}: ${error.message}`);
			response.status(error.statusCode).send({ error: error.message });
		} else {
			this.logger.error(`${error.message}`);
			response.status(500).send({ error: error.message });
		}

		this.logger.error(`${error.message}`);
		response.status(500).send({ error: error.message });
	}
}
