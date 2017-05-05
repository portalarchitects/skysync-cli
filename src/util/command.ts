import { stdin } from 'process';
import { SkySyncClient, Connection } from '../sdk';
import { OutputFormatter } from './formatter';

export async function runCommand(argv: any, handler: (client: SkySyncClient, output: OutputFormatter) => Promise<void>) {
	const client = new SkySyncClient(argv);
	const formatter = new OutputFormatter(argv);
	try {
		await handler(client, formatter);
	} catch (e) {
		if (!formatter.outputJson) {
			formatter.writeFailure(e.message, true);
		}
		console.error(e);
		process.exit(1);
	}
}

export async function readJsonInput(): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		stdin.resume();
		stdin.setEncoding('utf8');

		const inputChunks = [];
		stdin.on('data', function (chunk) {
			inputChunks.push(chunk);
		});

		stdin.on('end', function () {
			if (inputChunks.length === 0) {
				return resolve(undefined);
			}

			const inputJSON = inputChunks.join();
			try {
				resolve(JSON.parse(inputJSON));
			} catch (e) {
				return reject(e);
			}
		})
	});
}
