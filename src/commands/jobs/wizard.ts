import * as prompt from 'prompt';
import { 
	Job,
	JobSchedule,
	JobScheduleMode,
	StoragePlatform,
	Connection,
	SkySyncClient
} from '../../sdk';
const open = require('open')

export type WizardStep<T> = (obj: T) => Promise<T>;

async function runSteps<T>(obj: T, steps: WizardStep<T>[]): Promise<T> {
	for (let i = 0, count = steps.length; i < count; i++) {
		if (i !== 0) {
			console.log();
		}
		obj = await steps[i](obj);
	}
	return obj;
}

export class Wizard<T> {
	private readonly steps: WizardStep<T>[];

	constructor(...steps: WizardStep<T>[]) {
		this.steps = steps;
	}

	run(obj: T): Promise<T> {
		return runSteps(obj, this.steps);
	}
}

function promptStart() {
	prompt.start({
		memory: 0,
		allowEmpty: true
	});
	prompt.message = '';
	prompt.delimiter = '';
}

async function promptProperty(state: any, name: string, params: any = {}): Promise<void> {
	const result = await promptInput(name, params);
	if (result) {
		state[name] = result;
	}
}

function promptInput(name: string, params: any = {}): Promise<string> {
	if (typeof(params) === 'string') {
		params = {
			description: params
		};
	}

	params.name = name;

	promptStart();
	return new Promise<string>((resolve, reject) => {
		prompt.get([params], function (err, result) {
			if (err) {
				return reject(err);
			}
			return resolve(result && result[name]);
		});
	});
}

function promptConfirm(params: any = {}): Promise<boolean> {
	if (typeof(params) === 'string') {
		params = {
			description: params
		};
	}

	params.name = 'confirm';
	params.message = params.message || 'Y/N';
	params.pattern = /^[yntf]{1}/i;

	promptStart();

	return new Promise<boolean>((resolve, reject) => {
		prompt.get([params], function (err, result) {
			if (err) {
				return reject(err);
			}
			return resolve(/^[yt]{1}/i.test(result.confirm));
		});
	});
}

async function promptChoice(values: string[], params: any = {}): Promise<number> {
	if (typeof(params) === 'string') {
		params = {
			description: params
		};
	}

	let message = values.map((v, index) => `(${index + 1}) ${v}`).join('\n') + '\n:';
	if (params.description) {
		message = `${params.description}\n\n${message}`;
	}

	params.description = message;

	while (true) {
		var result = await promptInput('choice', params);
		const selection = parseInt(result, 10) - 1;
		if (!(values[selection])) {
			continue;
		}
		return selection;
	}
}

async function JobWelcomeStep(state: Job): Promise<Job> {
	const result = await promptConfirm({
		default: 'Y',
		description: 'This wizard will walk you through creating a new job\nDo you want to continue?'
	});
	if (!result) {
		throw new Error('Wizard Cancelled.');
	}
	return state
}

async function JobNameStep(state: Job): Promise<Job> {
	if (!state.name) {
		await promptProperty(state, 'name', 'Enter the job name: [default]');
	}
	return state;
}

async function JobCustomScheduleStep(state: Job): Promise<Job> {
	const customize = await promptConfirm({
		default: 'N',
		description: 'Do you want to customize the schedule?'
	});
	if (customize) {
		state = await runSteps(state, [
			JobScheduleModeStep
		]);
	} else if (!state.schedule) {
		state.schedule = {
			mode: JobScheduleMode.Automatic
		};
	}
	return state;
}

async function JobScheduleModeStep(state: Job): Promise<Job> {
	const index = await promptChoice([
			'Automatic (every 15 min.)',
			'Manual (only run when explicitly run)',
			'Custom'
		],
		'When do you want the job to run?'
	);
	if (!state.schedule) {
		state.schedule = {};
	}
	if (index === 0 || index === 2) {
		state.schedule.mode = JobScheduleMode.Automatic;
	} else {
		state.schedule.mode = JobScheduleMode.Manual;
	}
	if (index === 2) {
		state = await runSteps(state, []);
	}

	return state;
}

function TransferPathJobStep(client: SkySyncClient): WizardStep<Job> {
	let platformCache: StoragePlatform[] = null;
	const getPlatforms = async (): Promise<StoragePlatform[]> => {
		if (!platformCache) {
			platformCache = await client.storagePlatforms.list({
				active: 1
			});
		}
		return platformCache;
	};

	let lastPlatform: string = null;
	let connectionCache: Connection[] = null;
	const getConnections = async (platform: string): Promise<Connection[]> => {
		if (platform !== lastPlatform) {
			connectionCache = await client.connections.list({
				platform,
				active: 1
			});
			lastPlatform = platform;
		}
		return connectionCache;
	}

	const factory = (name: string): WizardStep<Job> => {
		return async (state: Job): Promise<Job> => {
			const platforms = await getPlatforms();
			const platform = platforms[
				await promptChoice(
					platforms.map(x => x.name),
					`What platform do you want for the ${name} of the job?`
				)
			];
			console.log();

			const connections = await getConnections(platform.id);
			const connectionChoices = connections.map(x => x.name);
			connectionChoices.push(`Add a new ${platform.name} connection`);

			const connectionIndex = await promptChoice(
				connectionChoices,
				`What connection do you want for the ${name} of the job?`
			);

			let connection: Connection;
			if (connectionIndex === connections.length) {
				const request = await client.connections.authorize(platform.id);
				open(request.target);

				await promptConfirm('Please continue after you have added the connection with your browser');
				connection = await client.connections.list({
					platform: platform.id,
					limit: 1,
					sort: 'modified_on DESC'
				})[0];
			} else {
				connection = connections[connectionIndex];
			}

			console.log();

			const path = await promptInput('path', `What is the ${name} path?`);
			if (!state.transfer) {
				state.transfer = {};
			}

			state.transfer[name] = {
				connection,
				target: {
					path
				}
			};

			return state;
		};
	};
	
	const sourceStep = factory('source');
	const destinationStep = factory('destination');

	return (state: Job): Promise<Job> => {
		return runSteps(state, [sourceStep, destinationStep]);
	};
}

export class JobWizard extends Wizard<Job> {
	constructor(client: SkySyncClient) {
		super(
			JobWelcomeStep,
			JobNameStep,
			JobCustomScheduleStep,
			TransferPathJobStep(client)
		);
	}
}
