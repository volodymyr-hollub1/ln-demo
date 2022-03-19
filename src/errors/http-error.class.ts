export class HTTPError extends Error {
	statusCode: number;
	message: string;
	context: string;

	constructor(statucCode: number, message: string, context?: string) {
		super(message);
		this.statusCode = statucCode;
		this.context = context ?? '';
		this.message = message;
	}
}
