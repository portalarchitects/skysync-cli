export interface DiagnosticMetric {
	name: string;
	value: string;
	type: string;
}

export interface DiagnosticFiddlerStatus {
	status: boolean;
	port?: number;
}

export interface DiagnosticLoggingStatus {
	level: string;
	retention_days?: number;
}

export enum LoggingLevel {
	Trace = 'trace',
	Debug = 'debug',
	Info = 'info',
	Warn = 'warn',
	Error = 'error',
	Fatal = 'fatal'
};

export const getLogLevels = (): string[] => {
	return Object.keys(LoggingLevel).map(key => LoggingLevel[key]);
};
