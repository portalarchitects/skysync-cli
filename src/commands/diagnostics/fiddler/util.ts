import { OutputFormatter } from '../../../util/formatter';
import { IHttpClient, IDownloadFileProvider, getTypedResponse, DiagnosticFiddlerStatus } from '../../../sdk';
import { FileDownloader } from '../../../util/file-downloader';

const outputFormat = {
	table: [
		{
			header: 'Status',
			property: 'status',
			transform: val => val ? 'Enabled' : 'Disabled',
		},
		{
			header: 'Port',
			property: 'port',
			transform: val => Boolean(val) ? val.toString() : '-'
		}
	]
};

export const getStatus = (httpClient: IHttpClient): Promise<DiagnosticFiddlerStatus> => {
	return getFiddlerResponse(httpClient.get('diagnostics/fiddler'));
};

export const changeStatus = (httpClient: IHttpClient, enable: boolean): Promise<DiagnosticFiddlerStatus> => {
	return getFiddlerResponse(httpClient.post('diagnostics/fiddler', {status: enable}));
};

export const installCerts = (httpClient: IHttpClient, trustRoot: boolean = false): Promise<DiagnosticFiddlerStatus> => {
	return getFiddlerResponse(httpClient.post(`diagnostics/fiddler/certificates?trust=${trustRoot ? '1' : '0'}`, null));
};

export const uninstallCerts = (httpClient: IHttpClient, trustRoot: boolean = false): Promise<boolean> => {
	return httpClient.delete(`diagnostics/fiddler/certificates?trust=${trustRoot ? '1' : '0'}`);
};

export const downloadTraces = (httpClient: IHttpClient, outputDirectory: string, purge?: boolean): Promise<string> => {
	const fileProvider = <IDownloadFileProvider>{
		getDownloadRequestPath(_: string) {
			return `diagnostics/fiddler/traces?purge=${purge ? '1' : '0'}`;
		}
	};

	const downloader = new FileDownloader(httpClient, fileProvider);
	return downloader.download(null, outputDirectory);
};

export const deleteTraces = (httpClient: IHttpClient): Promise<DiagnosticFiddlerStatus> => {
	return getFiddlerResponse(httpClient.delete('diagnostics/fiddler/traces'));
};

export const writeStatus = (status: DiagnosticFiddlerStatus, output: OutputFormatter) => {
	if (!Boolean(status)) {
		output.writeFailure('Fiddler is not available on this node.');
	} else {
		output.writeItem(status, outputFormat);
	}
};

const getFiddlerResponse = async (response: Promise<any>): Promise<DiagnosticFiddlerStatus> => {
	try {
		const result = await response;
		return getTypedResponse(result, 'fiddler');
	} catch (e) {
		return null;
	}
};
