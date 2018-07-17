import 'mocha';
import expect = require('expect.js');
import { TimeUnit, convertTimeInterval } from './time';

const addTest = (name, test) => {
	it(name, () => Array.apply(null, Array(1000)).map((_, index) => index).forEach(test));
};

const within = (assert, value) => {
	const tolerance = 0.00001;
	const min = value - tolerance;
	const max = value + tolerance;
	assert.to.be.within(min, max);
};

describe('convertTimeInterval', () => {
	addTest('test_ToNanoseconds', t => {
		within(expect(t * 1000000000 * 60 * 60 * 24), convertTimeInterval({value: t, unit: TimeUnit.Days}, TimeUnit.Nanoseconds).value);
		within(expect(t * 1000000000 * 60 * 60), convertTimeInterval({value: t, unit: TimeUnit.Hours}, TimeUnit.Nanoseconds).value);
		within(expect(t * 1000000000 * 60), convertTimeInterval({value: t, unit: TimeUnit.Minutes}, TimeUnit.Nanoseconds).value);
		within(expect(1000000000 * t), convertTimeInterval({value: t, unit: TimeUnit.Seconds}, TimeUnit.Nanoseconds).value);
		within(expect(1000000 * t), convertTimeInterval({value: t, unit: TimeUnit.Milliseconds}, TimeUnit.Nanoseconds).value);
		within(expect(1000 * t), convertTimeInterval({value: t, unit: TimeUnit.Microseconds}, TimeUnit.Nanoseconds).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Nanoseconds}, TimeUnit.Nanoseconds).value);
	});

	addTest('test_ToMicroseconds', t => {
		within(expect(t * 1000000 * 60 * 60 * 24), convertTimeInterval({value: t, unit: TimeUnit.Days}, TimeUnit.Microseconds).value);
		within(expect(t * 1000000 * 60 * 60), convertTimeInterval({value: t, unit: TimeUnit.Hours}, TimeUnit.Microseconds).value);
		within(expect(t * 1000000 * 60), convertTimeInterval({value: t, unit: TimeUnit.Minutes}, TimeUnit.Microseconds).value);
		within(expect(1000000 * t), convertTimeInterval({value: t, unit: TimeUnit.Seconds}, TimeUnit.Microseconds).value);
		within(expect(1000 * t), convertTimeInterval({value: t, unit: TimeUnit.Milliseconds}, TimeUnit.Microseconds).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Microseconds}, TimeUnit.Microseconds).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Nanoseconds}, TimeUnit.Microseconds).value * 1000);
	});

	addTest('test_ToMilliseconds', t => {
		within(expect(t * 1000 * 60 * 60 * 24), convertTimeInterval({value: t, unit: TimeUnit.Days}, TimeUnit.Milliseconds).value);
		within(expect(t * 1000 * 60 * 60), convertTimeInterval({value: t, unit: TimeUnit.Hours}, TimeUnit.Milliseconds).value);
		within(expect(t * 1000 * 60), convertTimeInterval({value: t, unit: TimeUnit.Minutes}, TimeUnit.Milliseconds).value);
		within(expect(1000 * t), convertTimeInterval({value: t, unit: TimeUnit.Seconds}, TimeUnit.Milliseconds).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Milliseconds}, TimeUnit.Milliseconds).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Microseconds}, TimeUnit.Milliseconds).value * 1000);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Nanoseconds}, TimeUnit.Milliseconds).value * 1000000);
	});

	addTest('test_ToSeconds', t => {
		within(expect(t * 60 * 60 * 24), convertTimeInterval({value: t, unit: TimeUnit.Days}, TimeUnit.Seconds).value);
		within(expect(t * 60 * 60), convertTimeInterval({value: t, unit: TimeUnit.Hours}, TimeUnit.Seconds).value);
		within(expect(t * 60), convertTimeInterval({value: t, unit: TimeUnit.Minutes}, TimeUnit.Seconds).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Seconds}, TimeUnit.Seconds).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Milliseconds}, TimeUnit.Seconds).value * 1000);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Microseconds}, TimeUnit.Seconds).value * 1000000);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Nanoseconds}, TimeUnit.Seconds).value * 1000000000);
	});

	addTest('test_ToMinutes', t => {
		within(expect(t * 60 * 24), convertTimeInterval({value: t, unit: TimeUnit.Days}, TimeUnit.Minutes).value);
		within(expect(t * 60), convertTimeInterval({value: t, unit: TimeUnit.Hours}, TimeUnit.Minutes).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Minutes}, TimeUnit.Minutes).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Seconds}, TimeUnit.Minutes).value * 60);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Milliseconds}, TimeUnit.Minutes).value * 1000 * 60);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Microseconds}, TimeUnit.Minutes).value * 1000000 * 60);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Nanoseconds}, TimeUnit.Minutes).value * 1000000000 * 60);
	});

	addTest('test_ToHours', t => {
		within(expect(t * 24), convertTimeInterval({value: t, unit: TimeUnit.Days}, TimeUnit.Hours).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Hours}, TimeUnit.Hours).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Minutes}, TimeUnit.Hours).value * 60);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Seconds}, TimeUnit.Hours).value * 60 * 60);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Milliseconds}, TimeUnit.Hours).value * 1000 * 60 * 60);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Microseconds}, TimeUnit.Hours).value * 1000000 * 60 * 60);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Nanoseconds}, TimeUnit.Hours).value * 1000000000 * 60 * 60);
	});

	addTest('test_ToDays', t => {
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Days}, TimeUnit.Days).value);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Hours}, TimeUnit.Days).value * 24);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Minutes}, TimeUnit.Days).value * 60 * 24);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Seconds}, TimeUnit.Days).value * 60 * 60 * 24);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Milliseconds}, TimeUnit.Days).value * 1000 * 60 * 60 * 24);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Microseconds}, TimeUnit.Days).value * 1000000 * 60 * 60 * 24);
		within(expect(t), convertTimeInterval({value: t, unit: TimeUnit.Nanoseconds}, TimeUnit.Days).value * 1000000000 * 60 * 60 * 24);
	});

	it('test_ToNanoseconds_saturate', () => {
		within(expect(Number.MAX_VALUE), convertTimeInterval({value: Number.MAX_VALUE / 2, unit: TimeUnit.Milliseconds}, TimeUnit.Nanoseconds).value);
		within(expect(-Number.MAX_VALUE), convertTimeInterval({value: -Number.MAX_VALUE / 3.0, unit: TimeUnit.Milliseconds}, TimeUnit.Nanoseconds).value);
	});
});
