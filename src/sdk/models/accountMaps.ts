import { IEntityIdentifier } from './base';
import { SecurityMap, SecurityMapException, SecurityMapExclusion } from './securityMaps';

export interface AccountMap extends IEntityIdentifier<string>, SecurityMap {}

export interface AccountMapException extends IEntityIdentifier<string>, SecurityMapException {}

export interface AccountMapExclusion extends IEntityIdentifier<string>, SecurityMapExclusion {}
