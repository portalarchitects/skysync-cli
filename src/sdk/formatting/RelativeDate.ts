const second = 1e3;
const minute = 6e4;
const hour = 36e5;
const day = 864e5;

export class RelativeDate {
	private _date: Date;
	private _now: Date;
	private _ms: number;
	private _years: number;
	private _months: number;
	private _days: number;
	private _hours: number;
	private _minutes: number;
	private _seconds: number;

	constructor(date: Date, now?: Date) {
		this._date = date;
		this._now = now;
		this._ms = date.getTime() - now.getTime();
		this._years = date.getFullYear() - now.getFullYear();
	}

	getFlooredUnitDelta(unit: number) : number {
		const date = this._date.getTime() - this._date.getTimezoneOffset() * minute;
		const now = this._now.getTime() - this._now.getTimezoneOffset() * minute;
		return Math.floor(date / unit) - Math.floor(now / unit);
	}
	
	get ms(): number {
		return this._ms;
	}

	get years(): number {
		return this._years;
	}

	get isCurrentYear(): boolean {
		return this._date.getFullYear() === this._now.getFullYear();
	}

	get isPast(): boolean {
		return this._ms <= 0;
	}

	get isFuture(): boolean {
		return this._ms > 0;
	}

	get months(): number {
		if (!this._months) {
			this._months = this._years * 12 + this._date.getMonth() - this._now.getMonth();
		}
		return this._months;
	}

	get days(): number {
		if (!this._days) {
			this._days = this.getFlooredUnitDelta(day);
		}
		return this._days;
	}

	get hours(): number {
		if (!this._hours) {
			this._hours = this.getFlooredUnitDelta(hour);
		}
		return this._hours;
	}

	get minutes(): number {
		if (!this._minutes) {
			this._minutes = this.getFlooredUnitDelta(minute);
		}
		return this._minutes;
	}

	get seconds(): number {
		if (!this._seconds) {
			this._seconds = this.getFlooredUnitDelta(second);
		}
		return this._seconds;
	}

	get date(): Date {
		return this._date;
	}

	abs(): RelativeDate {
		if (this.ms > 0) {
			return this;
		}
		return new RelativeDate(this._now, this._date);
	}
}
