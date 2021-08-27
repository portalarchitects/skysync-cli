export interface ParallelWrites {
    requested?: number;
    max?: number;
}

export interface Performance {
    parallel_writes?: ParallelWrites;
}