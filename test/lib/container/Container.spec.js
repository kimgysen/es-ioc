

import { getManualContainer, ManagedType } from "../../../src";
import DemoSingleton from "./test-components/DemoSingleton";
import DemoSingleton2 from "./test-components/DemoSingleton2";
import DepProto from "./test-components/DepProto";
import DepSingleton from "./test-components/DepSingleton";
import RuntimeDependency from "./test-components/RuntimeDependency";
import AppConfig from "./test-components/AppConfig";

/**
 * Mock ApplicationContext
 * Prefill (mimick decorators)
 */

describe('Test container', () => {

	const container_1 = getManualContainer('container-1');
	const container_2 = getManualContainer('container-2');
	const containers = [container_1, container_2];

	beforeAll(() => {
		for (let container of containers) {
			container.registerComponent('demoSingleton', { managedType: ManagedType.SINGLETON, Cls: DemoSingleton });
			container.registerComponent('demoSingleton2', { managedType: ManagedType.SINGLETON, Cls: DemoSingleton2 });
			container.registerComponent('depProto', { managedType: ManagedType.PROTOTYPE, Cls: DepProto });
			container.registerComponent('depSingleton', { managedType: ManagedType.SINGLETON, Cls: DepSingleton });

			container.registerDependencies('demoSingleton', ['depSingleton', 'depProto']);
			container.registerDependencies('depSingleton', ['depProto']);
		}
	});


	it('Should have 1 singleton instance per container', () => {
		const cont1_singleton1 = container_1.get('demoSingleton');
		const cont1_singleton2 = container_1.get('demoSingleton');

		console.log(cont1_singleton1 === cont1_singleton2);

		const cont2_singleton1 = container_2.get('demoSingleton');

		console.log(cont1_singleton1 === cont2_singleton1);
	});

	it('Should get a new ²prototype instance per on each request', () => {
		const cont1_prototype1 = container_1.get('depProto');
		const cont1_prototype2 = container_2.get('depProto');

		console.log(cont1_prototype1 === cont1_prototype2);

	});

	it('Should correctly inject (sub)dependencies', () => {
		const singleton = container_1.get('demoSingleton');
		console.log(singleton);
	});

});
