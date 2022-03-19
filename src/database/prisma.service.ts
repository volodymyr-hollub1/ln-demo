import { PrismaClient, UserModel } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			this.logger.log('[PrismaService] Success connect');
			await this.client.$connect();
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] Error of connection');
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
