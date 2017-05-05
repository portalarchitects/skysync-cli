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
		if (stdin.isTTY) {
			console.log('isTTY');
			return resolve(undefined);
		}

		let promiseHandled = false;

		const inputChunks = [];
		function onInputData(chunk) {
			inputChunks.push(chunk);
		}

		function onInputEnd() {
			if (promiseHandled) {
				return;
			}

			if (inputChunks.length === 0) {
				promiseHandled = true;
				return resolve(undefined);
			}

			const inputJSON = inputChunks.join();
			try {
				resolve(JSON.parse(inputJSON));
				promiseHandled = true;
			} catch (e) {
				if (!promiseHandled) {
					promiseHandled = true;
					return reject(e);
				}
			}
		}

		try {
			stdin.resume();
			stdin.setEncoding('utf8');

			stdin.on('data', onInputData);
			stdin.on('end', onInputEnd);
		} catch (e) {
			console.log(e);
			if (!promiseHandled) {
				promiseHandled = true;
				return reject(e);
			}
		}
	});
}
