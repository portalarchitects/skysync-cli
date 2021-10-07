import { TimeOfDay } from './time';

export interface ParallelWrites {
	requested?: number;
	max?: number;
}

export interface ThrottleWindowOptions {
	bytes_per_second?: number;
	start_time?: TimeOfDay;
	end_time?: TimeOfDay;
	days?: string[];
}

export interface ThrottleOptions {
	bytes_per_second?: number;
	window?: ThrottleWindowOptions[];
	disabled?: boolean;
}

export interface Performance {
	parallel_writes?: ParallelWrites;
	concurrent_transfers?: number;
	max_concurrent_transfers?: number;
	upload?: ThrottleOptions;
	download?: ThrottleOptions;
}
