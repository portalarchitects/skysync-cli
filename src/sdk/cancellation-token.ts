export class CancellationToken {
	private _listeners: { (): void } [] = [];
	private _cancelled: boolean = false;
	
	public get isCancelled(): boolean {
		return this._cancelled;
	}

	public onCancel(callback: () => void) {
		if (this._cancelled) {
			callback();
		} else {
			this._listeners.push(callback);
		}
	}
	
	public cancel() {
		this._cancelled = true;
		this._listeners.forEach(callback => callback());
	}
}
