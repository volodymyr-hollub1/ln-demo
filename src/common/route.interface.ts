import { NextFunction, Router, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (request: Request, response: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put' | 'patch'>;
	middlewares?: IMiddleware[];
}
