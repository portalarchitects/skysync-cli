export interface DiagnosticMetric  {
	name: string;
	value: string;
	type: string;
}

export interface DiagnosticFiddlerStatus {
	status: boolean;
	port?: number;
}
