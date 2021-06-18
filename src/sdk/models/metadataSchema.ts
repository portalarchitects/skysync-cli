export interface PropertyIdentifier {
	id?: string;
	name?: string;
	query_name?: string;
	caption?: string;
	description?: string;
}

export interface PropertyIdentifierList<T extends PropertyIdentifier> {
	[key: string]: T;
}

export interface PropertyDefinition<T = string> extends PropertyIdentifier {
	type?: string;
	cardinality?: 'single' | 'multi';
	choices?: PropertyChoice<T>[];
}

export interface PropertyChoice<T = any> extends PropertyIdentifier {
	value?: T;
}

export interface PropertySchema {
	id?: string;
	name?: string;
	properties?: PropertyIdentifierList<PropertyDefinition>;
}
