import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'email error' })
	email: string;

	@IsString({ message: 'password is not entered' })
	password: string;

	@IsString({ message: 'name is not entered' })
	name: string;
}
