export enum MetadataConjunctionOperator {
	And = 'and',
	Or = 'or'
}

export enum MetadataPropertyFilterOperator {
	eq = 'Equals',
	Equals = 'Equals',
	ne = 'Not Equal',
	NotEqual = 'Not Equal',
	lt = 'Less Than',
	LessThan = 'Less Than',
	le = 'Less Than Equal To',
	LessThanEqualTo = 'Less Than Equal To',
	gt = 'Greater Than',
	GreaterThan = 'Greater Than',
	ge = 'Greater Than Equal To',
	GreaterThanEqualTo = 'Greater Than Equal To',
	starts_with = 'Starts With',
	StartsWith = 'Starts With',
	not_starts_with = 'Does Not Start With',
	DoesNotStartWith = 'Does Not Start With',
	ends_with = 'Ends With',
	EndsWith = 'Ends With',
	not_ends_with = 'Does Not End With',
	DoesNotEndWith = 'Does Not End With',
	contains = 'Contains',
	Contains = 'Contains',
	not_contains = 'Does Not Contain',
	DoesNotContain = 'Does Not Contain',
	in = 'In',
	In = 'In',
	not_in = 'Not In',
	NotIn = 'Not In',
	empty = 'Empty',
	Empty = 'Empty',
	not_empty = 'Not Empty',
	NotEmpty = 'Not Empty'
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
	function: string;
	args?: MetadataComponentExpression[];
}

export interface MetadataPropertyExpression {
	name: string;
}

export interface MetadataStaticExpression {
	value: any;
}
