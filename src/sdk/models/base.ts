export interface IEntityIdentifier<TID> {
	id?: TID;
}

export interface Link {
	href?: string;
};

export interface ILinks {
	[name: string]: Link;
}

export interface IHaveLinks<T extends ILinks> {
	links?: T;
}
