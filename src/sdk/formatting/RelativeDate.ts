const startOf = (date: Date, unit: 'day' | 'hour' | 'minute' | 'second', convertToLocal?: boolean): Date => {
	date = convertToLocal ? new Date(date.getTime() - (date.getTimezoneOffset() * minute)) : new Date(date);
	switch (unit) {
		case 'day': date.setUTCHours(0);
		// falls through
		case 'hour': date.setUTCMinutes(0);
		// falls through
		case 'minute': date.setUTCSeconds(0);
		// falls through
		case 'second': date.setUTCMilliseconds(0);
	}
	return date;
};

const second = 1e3;
const minute = 6e4;
const hour = 36e5;
const day = 864e5;

export class RelativeDate {
	private _round: (n: number) => number;
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
		this._years = date.getUTCFullYear() - now.getUTCFullYear();
		this._round = Math[this._ms > 0 ? 'floor' : 'ceil'];
	}

	get ms(): number {
		return this._ms;
	}

	get years(): number {
		return this._years;
	}

	get isCurrentYear(): boolean {
		return this._date.getUTCFullYear() === this._now.getUTCFullYear();
	}

	get isPast(): boolean {
		return this._ms < 0;
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
			this._days = this._round((<any>startOf(this._date, 'day', true) - <any>startOf(this._now, 'day', true)) / day);
		}
		return this._days;
	}

	get hours(): number {
		if (!this._hours) {
			this._hours = this._round((<any>startOf(this._date, 'hour') - <any>startOf(this._now, 'hour')) / hour);
		}
		return this._hours;
	}

	get minutes(): number {
		if (!this._minutes) {
			this._minutes = this._round((<any>startOf(this._date, 'minute') - <any>startOf(this._now, 'minute')) / minute);
		}
		return this._minutes;
	}

	get seconds(): number {
		if (!this._seconds) {
			this._seconds = this._round((<any>startOf(this._date, 'second') - <any>startOf(this._now, 'second')) / second);
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
