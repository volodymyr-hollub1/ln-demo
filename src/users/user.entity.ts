import { compare, hash } from 'bcrypt';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(password: string, salt: string): Promise<void> {
		this._password = await hash(password, 10);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return compare(password, this._password);
	}
}
