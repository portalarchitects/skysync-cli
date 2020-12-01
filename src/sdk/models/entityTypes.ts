import { IAuditedEntity, IEntityIdentifier } from './base';

export interface EntityType extends IEntityIdentifier<string>, IAuditedEntity {
	name?: string;
	description?: string;
	kind?: string;
	threshold?: number;
	disabled?: boolean;
}

export type EntityTypePropertyValue = {
	value: any;
	confidence?: number;
	keyword?: boolean;
	valid?: boolean;
	original_confidence?: number;
} | any;

export type EntityTypePropertyValues = {
	values: EntityTypePropertyValue[];
};

export interface EntityTypeEvaluationResult {
	id?: string;
	properties?: {
		[key: string]: EntityTypePropertyValues;
	};
}
