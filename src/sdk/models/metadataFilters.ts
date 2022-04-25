export enum MetadataConjunctionOperator {
	And = 'and',
	Or = 'or'
}

export enum MetadataPropertyFilterOperator {
	Equals = 'eq',
	NotEqual = 'ne',
	LessThan = 'lt',
	LessThanEqualTo = 'le',
	GreaterThan = 'gt',
	GreaterThanEqualTo = 'ge',
	StartsWith = 'starts_with',
	DoesNotStartWith = 'not_starts_with',
	EndsWith = 'ends_with',
	DoesNotEndWith = 'not_ends_with',
	Contains = 'contains',
	DoesNotContain = 'not_contains',
	In = 'in',
	NotIn = 'not_in',
	Empty = 'empty',
	NotEmpty = 'not_empty',
}

export enum MetadataFunctionName {
	Now = 'Now',
	Year = 'Year',
	Month = 'Month',
	Day = 'Day',
	AddDays = 'AddDays',
	AddMonths = 'AddMonths',
	AddYears = 'AddYears',
	FormatDate = 'FormatDate',
	IsOlderThanDays = 'IsOlderThanDays',
	IsOlderThanWeeks = 'IsOlderThanWeeks',
	IsOlderThanMonths = 'IsOlderThanMonths',
	IsOlderThanYears = 'IsOlderThanYears',
	Concat = 'Concat',
	Convert = 'Convert',
	Contains = 'Contains',
	StartsWith = 'StartsWith',
	EndsWith = 'EndsWith',
	GetExtension = 'GetExtension',
	GetFileName = 'GetFileName',
	GetFileNameWithoutExtension = 'GetFileNameWithoutExtension'
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
	threshold?: number;
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
