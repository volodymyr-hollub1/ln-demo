import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, response: Response, next: NextFunction): void {
		const instance = plainToInstance(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				response.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
