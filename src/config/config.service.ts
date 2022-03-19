import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] File of configuration is not found');
		} else {
			this.logger.log('[ConfigService] File of configuration [.env] is loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
