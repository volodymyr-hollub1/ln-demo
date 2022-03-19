import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(request: Request, response: Response, next: NextFunction): void {
		if (request.headers.authorization) {
			verify(request.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					request.user = payload as string;
					next();
				}
			});
		} else {
			next();
		}
	}
}
