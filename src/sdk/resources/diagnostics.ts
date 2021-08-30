import { IHttpClient } from '../http';
import { getTypedResponse, BaseResource } from './resource';
import { DiagnosticMetric, DiagnosticFiddlerStatus, DiagnosticLoggingStatus } from '../models';
import { CancellationToken } from '../cancellation-token';

export class DiagnosticMetricsResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async list(params?: any, token?: CancellationToken): Promise<DiagnosticMetric[]> {
		const result = await this.httpClient.get('diagnostics/metrics', this.mergeDefaultParams(params), token);
		return getTypedResponse<DiagnosticMetric[]>(result, 'metrics');
	}
}

export class DiagnosticFiddlerResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(token?: CancellationToken): Promise<DiagnosticFiddlerStatus> {
		const result = await this.httpClient.get('diagnostics/fiddler', token);
		return getTypedResponse<DiagnosticFiddlerStatus>(result, 'fiddler');
	}

	async post(status: boolean, token?: CancellationToken): Promise<DiagnosticFiddlerStatus> {
		const body: DiagnosticFiddlerStatus = { status };
		const result = await this.httpClient.post('diagnostics/fiddler', body, token);
		return getTypedResponse<DiagnosticFiddlerStatus>(result, 'fiddler');
	}
}

export class DiagnosticLoggingResource extends BaseResource {
	constructor(httpClient: IHttpClient) {
		super(httpClient);
	}

	async get(token?: CancellationToken): Promise<DiagnosticLoggingStatus> {
		const result = await this.httpClient.get('diagnostics/logs/configuration', token);
		return getTypedResponse<DiagnosticLoggingStatus>(result, 'logging');
	}

	async post(logging: DiagnosticLoggingStatus, token?: CancellationToken): Promise<DiagnosticLoggingStatus> {
		const result = await this.httpClient.post('diagnostics/logs/configuration', logging, token);
		return getTypedResponse<DiagnosticLoggingStatus>(result, 'logging');
	}
}
