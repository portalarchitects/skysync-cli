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