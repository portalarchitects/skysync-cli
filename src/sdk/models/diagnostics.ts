export interface DiagnosticMetric  {
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
	retention_days: number; // readonly - added to prevent changing value on backend
}
