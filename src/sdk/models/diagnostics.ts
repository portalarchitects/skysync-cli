export interface DiagnosticMetric  {
	name: string;
	value: string;
	type: string;
}

export interface DiagnosticFiddlerStatus {
	status: boolean;
	port?: number;
}

export enum LoggingLevel {
	Trace = 'trace',
	Debug = 'debug',
	Info = 'info',
	Warn = 'warn',
	Error = 'error',
	Fatal = 'fatal'
};

export interface DiagnosticLoggingStatus {
	level: string;
	retention_days?: number;
}
