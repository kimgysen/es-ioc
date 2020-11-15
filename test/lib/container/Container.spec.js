import {Component} from "../../../src";

import DemoSingleton from '../../samples/test-decorators/components/DemoSingleton';

describe('Test container', () => {

	beforeAll(() => {
	});

	@Component
	class Test {
	}

	it('Creates a new component instance', () => {
		console.log(DemoSingleton);
		expect(0).toEqual(0);
	});



});
