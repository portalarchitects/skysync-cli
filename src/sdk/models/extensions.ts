import { IEntityIdentifier } from './base';
import { PromptAttributes } from './prompt';

export interface Extension extends IEntityIdentifier<string> {
	description?: string;
	version?: string;
	disabled?: boolean;
	configuration?: PromptAttributes;
}
