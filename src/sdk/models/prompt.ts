export interface PromptAttributeOption {
	caption?: string;
}

export interface PromptAttributeOptionList {
	[key: string]: PromptAttributeOption;
}

export interface PromptAttribute {
	type?: string;
	id?: string;
	caption?: string;
	hint?: string;
	required?: boolean;
	value?: any;
	options?: PromptAttributeOptionList;
}

export interface PromptAttributes {
	[name: string]: PromptAttribute;
}
