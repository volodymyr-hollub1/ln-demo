import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUserRepository) private userRepository: IUserRepository,
	) {}

	public async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, salt);
		const existedUser = await this.userRepository.find(email);

		if (!existedUser) {
			return this.userRepository.create(newUser);
		}

		return existedUser;
	}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const user = new User(existedUser.email, existedUser.name, existedUser.password);
		return await user.comparePassword(password);
	}
}
