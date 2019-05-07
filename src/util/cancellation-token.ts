export class CancellationToken {
	private listeners: { (): void } [] = [];
	private cancelled: boolean = false;
	
	public get isCancelled(): boolean {
		return this.isCancelled;
	}

	public onCancel(callback: () => void) {
		if (this.cancelled) {
			callback();
		} else {
			this.listeners.push(callback);
		}
	}
	
	public cancel() {
		this.cancelled = true;
		this.listeners.forEach(callback => callback());
	}
}
