import expect = require('expect.js');
import {PlatformComparisonRuleStatus} from "./types";
import { StoragePlatform, ConnectionFeatures } from '../connections';
import {
	ifFeaturePresent,
	ifLengthLessThan,
	ifSizeGreaterThan,
	checkFeatures,
	checkPath,
	availableIfSupported,
	ifStringArrayExists
} from './util';

describe('ifStringArrayExists', () => {
	it(' is Compatiable', () => {
		expect(ifStringArrayExists(['<','>',':','\\','/','\"','|','?','*'], ['/','\\'], 'invalid_characters').status).to.eql(PlatformComparisonRuleStatus.Compatible);
		expect(ifStringArrayExists(['/','\\'], [], 'invalid_characters').status).to.eql(PlatformComparisonRuleStatus.Compatible);
	});
	it(' is NotCompatiable', () => {
		expect(ifStringArrayExists(['/','\\'], ['<','>',':','\\','/','\"','|','?','*'], 'invalid_characters').status).to.eql(PlatformComparisonRuleStatus.NotCompatible);
		expect(ifStringArrayExists([], ['<','>',':','\\','/','\"','|','?','*'], 'invalid_characters').status).to.eql(PlatformComparisonRuleStatus.NotCompatible);
	});
	it(' is NotApplicable', () => {
		expect(ifStringArrayExists(undefined, undefined, 'invalid_characters').status).to.eql(PlatformComparisonRuleStatus.NotApplicable);
	});
});
