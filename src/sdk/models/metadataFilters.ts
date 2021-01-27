export enum MetadataConjunctionOperator {
	And = 'and',
	Or = 'or'
}

export enum MetadataPropertyFilterOperator {
	eq = 'Equals',
	ne = 'Not Equal',
	lt = 'Less Than',
	le = 'Less Than Equal To',
	gt = 'Greater Than',
	ge = 'Greater Than Equal To',
	starts_with = 'Starts With',
	not_starts_with = 'Does Not Start With',
	ends_with = 'Ends With',
	not_ends_with = 'Does Not End With',
	contains = 'Contains',
	not_contains = 'Does Not Contain',
	in = 'In',
	not_in = 'Not In',
	empty = 'Empty',
	not_empty = 'Not Empty',
}

export enum MetadataFunctionName {
	Now = 'Now',
	Year = 'Year',
	Month = 'Month',
	Day = 'Day',
	AddDays = 'Add Days',
	AddMonths = 'Add Months',
	AddYears = 'Add Years',
	FormatDate = 'Format Date',
	Concat = 'Concat',
	Convert = 'Convert',
	Contains = 'Contains',
	StartsWith = 'Starts With',
	EndsWith = 'Ends With',
	GetExtension = 'Get Extension',
	GetFileName = 'Get File Name',
	GetFileNameWithoutExtension = 'Get File Name Without Extension'
}

export type MetadataComponentFilter = MetadataConjunctionFilter | MetadataPropertyFilter;

export interface MetadataCalculatedFilter {
	text?: string;
	expression?: MetadataComponentFilter;
}

export interface MetadataConjunctionFilter {
	conjunction?: MetadataConjunctionOperator;
	filters?: MetadataComponentFilter[];
}

export interface MetadataPropertyFilter {
	name?: string;
	op?: MetadataPropertyFilterOperator;
	value?: object;
	select?: MetadataCalculatedExpression;
}

export type MetadataComponentExpression = MetadataFunctionExpression | MetadataPropertyExpression | MetadataStaticExpression;

export interface MetadataCalculatedExpression {
	text?: string;
	expression?: MetadataComponentExpression;
}

export interface MetadataFunctionExpression {
	function: MetadataFunctionName | string;
	args?: MetadataComponentExpression[];
}

export interface MetadataPropertyExpression {
	name: string;
}

export interface MetadataStaticExpression {
	value: any;
}
