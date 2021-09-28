export interface ParallelWrites {
	requested?: number;
	max?: number;
}

export interface Performance {
	parallel_writes?: ParallelWrites;
	concurrent_transfers?: number;
	max_concurrent_transfers?: number;
}
