
import { describe, beforeEach, it } from '@jest/globals';

import { getManualContainer, ManagedType } from "../../src";
import DemoSingleton from "./test-components/manual/DemoSingleton";
import DemoSingleton2 from "./test-components/manual/DemoSingleton2";
import DepProto from "./test-components/manual/DepProto";
import DepSingleton from "./test-components/manual/DepSingleton";
import RuntimeDependency from "./test-components/manual/RuntimeDependency";


describe('Test container', () => {

	const container_1 = getManualContainer('container-1');
	const container_2 = getManualContainer('container-2');
	const containers = [container_1, container_2];

	beforeEach(() => {
		for (let container of containers) {
			container.registerComponent('demoSingleton', { managedType: ManagedType.SINGLETON, Cls: DemoSingleton });
			container.registerComponent('demoSingleton2', { managedType: ManagedType.SINGLETON, Cls: DemoSingleton2 });
			container.registerComponent('depProto', { managedType: ManagedType.PROTOTYPE, Cls: DepProto });
			container.registerComponent('depSingleton', { managedType: ManagedType.SINGLETON, Cls: DepSingleton });

			container.registerDependencies('demoSingleton', ['depSingleton', 'depProto']);
			container.registerDependencies('demoSingleton2', ['depSingleton', 'depProto']);
			container.registerDependencies('depSingleton', ['depProto']);
		}
	});


	it('Should have 1 singleton instance per container', () => {
		const cont1_singleton1 = container_1.get('demoSingleton');
		const cont1_singleton2 = container_1.get('demoSingleton');
		const cont2_singleton1 = container_2.get('demoSingleton');

		expect(cont1_singleton1).toBeInstanceOf(DemoSingleton);
		expect(cont1_singleton2).toBeInstanceOf(DemoSingleton);

		expect(cont1_singleton1).toBe(cont1_singleton2);
		expect(cont1_singleton1).not.toBe(cont2_singleton1);
	});

	it('Should get a new ²prototype instance per on each request', () => {
		const cont1_prototype1 = container_1.get('depProto');
		const cont1_prototype2 = container_2.get('depProto');

		expect(cont1_prototype1).toBeInstanceOf(DepProto);
		expect(cont1_prototype2).toBeInstanceOf(DepProto);
		expect(cont1_prototype1).not.toBe(cont1_prototype2);

	});

	it('Should correctly inject (sub)dependencies', () => {
		// Container 1
		const singleton = container_1.get('demoSingleton');
		const depSingleton = singleton.depSingleton;
		const depSingleton2 = container_1.get('depSingleton');
		const depProto = singleton.depProto;
		const subDepProto = depSingleton.depProto;

		expect(singleton).toBeInstanceOf(DemoSingleton);
		expect(depSingleton).toBeInstanceOf(DepSingleton);
		expect(depSingleton2).toBeInstanceOf(DepSingleton);
		expect(depSingleton).toBe(depSingleton2);

		expect(depProto).toBeInstanceOf(DepProto);
		expect(subDepProto).toBeInstanceOf(DepProto);

		// Container 2
		const singleton2 = container_2.get('demoSingleton');
		const cont2_depSingleton = singleton2.depSingleton;

		// Check container isolation on injected singleton dependency
		expect(depSingleton).not.toBe(cont2_depSingleton);
	});

	it('Should apply runtime overrides using callback', () => {

		const demoSingletonBeforeOverride = container_1.get('demoSingleton');
		const depSingletonBeforeOverride = container_1.get('depSingleton');
		container_1.registerOverride('depSingleton', () => new RuntimeDependency());

		const demoSingletonAfterOverride = container_1.get('demoSingleton2');
		const depSingleton = container_1.get('depSingleton');

		expect(depSingleton).toBeInstanceOf(RuntimeDependency);
		expect(demoSingletonAfterOverride.depSingleton).toBe(depSingleton);

		expect(demoSingletonBeforeOverride.depSingleton).toBeInstanceOf(DepSingleton);
		expect(depSingletonBeforeOverride).toBeInstanceOf(DepSingleton);
		expect(depSingleton).not.toBe(depSingletonBeforeOverride);

	});

	it('Should apply runtime overrides using instance', () => {
		const runtimeObj = new RuntimeDependency();
		container_1.registerOverride('depProto', runtimeObj);

		const depProto = container_1.get('depProto');
		expect(depProto).toBeInstanceOf(RuntimeDependency);
	});

});
