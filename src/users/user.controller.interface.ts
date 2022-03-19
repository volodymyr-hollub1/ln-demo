import { Response, Request, NextFunction } from 'express';

export interface IUserController {
	login: (request: Request, response: Response, next: NextFunction) => Promise<void>;
	register: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
