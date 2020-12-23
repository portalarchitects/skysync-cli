export interface IEntityIdentifier<TID> {
	id?: TID;
}

export interface IAuditedEntity {
	created_by?: string;
	created_on?: number;
	modified_by?: string;
	modified_on?: number;
}

export interface IPrioritizedEntity {
	priority?: number;
}

export interface Link {
	href?: string;
}

export interface ILinks {
	[name: string]: Link;
}

export interface IHaveLinks<T extends ILinks> {
	links?: T;
}
