import * as cliff from 'cliff';
import * as dot from 'dot-object';

export interface OutputFormatterOptions {
	outputJson?: boolean;
	tabSize?: string | number;
}

export interface OutputOptions {
	table?: {
		property: string;
		header: string;
		transform?: (val: any) => any;
	}[];
	json?: string[];
}

export class OutputFormatter {
	constructor(private formatOptions: OutputFormatterOptions) {
		if (!this.formatOptions.tabSize) {
			this.formatOptions.tabSize = 2;
		}
	}

	get outputJson(): boolean {
		return this.formatOptions.outputJson;
	}

	writeTable(obj: any[], options?: OutputOptions): void {
		this.write(obj, options, true);
	}

	writeItem(obj: any, options?: OutputOptions): void {
		this.write(obj, options, false);
	}

	writeSuccess(message: string, force: boolean = false): void {
		if (!this.outputJson || force) {
			console.log((message as any).green);
		}
	}

	writeFailure(message: string, force: boolean = false): void {
		if (!this.outputJson || force) {
			console.error((message as any).red);
		}
	}
	
	writeCsv(output: string): void {
		console.log(output);
	}

	private write(obj: any, options?: OutputOptions, asTable?: boolean): void {
		if (!obj) {
			if (this.formatOptions.outputJson) {
				console.log("null");
				return;
			} else {
				obj = [];
			}
		}
		if (!Array.isArray(obj)) {
			obj = [obj];
		}
		console.log(this.toString(obj, options, asTable));
	}

	toString(obj: any[], options?: OutputOptions, asTable: boolean = true): string {
		if (!obj) {
			return null;
		}

		if (!asTable && obj.length > 1) {
			asTable = true;
		}

		if (this.formatOptions.outputJson) {
			const json = obj.map(x => copyJson(x, options));
			return JSON.stringify(json, null, this.formatOptions.tabSize);
		} else if (!asTable) {
			const data = options && options.table.map(col => {
				const val = formatToString(col, obj[0]);
				return [(col.header as any).grey, val];
			});

			return cliff.stringifyRows(data);
		} else {
			const data = options && obj.map(x => {
				return options.table.map(col => formatToString(col, x));
			}) || [];

			if (options) {
				data.splice(0, 0, options.table.map(x => x.header));
			}

			return cliff.stringifyRows(data, ['gray']);
		}
	}
}

function formatToString(col: { property?: string, transform?: (val: any) => any; }, obj: any): string {
	let val = dot.pick(col.property, obj);
	if (col.transform) {
		val = col.transform(val);
	}
	if (typeof (val) === 'undefined') {
		val = '';
	} else if (typeof (val) !== 'string') {
		val = val.toString();
	}
	return val;
}

function copyJson(obj: any, options?: OutputOptions): any {
	if (options) {
		const copy = {};
		options.table.forEach(x => dot.copy(x.property, x.property, obj, copy));
		if (options.json) {
			options.json.forEach(x => dot.copy(x, x, obj, copy));
		}
		obj = copy;
	}

	return obj;
}
