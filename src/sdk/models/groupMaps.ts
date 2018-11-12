import { IEntityIdentifier } from './base';
import { SecurityMap, SecurityMapException, SecurityMapExclusion } from './securityMaps';

export interface GroupMap extends IEntityIdentifier<string>, SecurityMap {}

export interface GroupMapException extends IEntityIdentifier<string>, SecurityMapException {}

export interface GroupMapExclusion extends IEntityIdentifier<string>, SecurityMapExclusion {}

