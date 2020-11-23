
import FullManualDepProto from "./components/FullManualDepProto";
import FullManualDepSingleton from "./components/FullManualDepSingleton";
import FullManualSingleton from "./components/FullManualSingleton";
import FullManualSingleton2 from "./components/FullManualSingleton2";


import {
	getManualContainer,
	ManagedType
} from "es-ioc";

import treeify from "treeify";
import RuntimeDependency from "./components/RuntimeDependency";


console.log('******************************************');
console.log('*** Test with full manual registration ***');
console.log('******************************************');

const setupContainer = container => {
	container.registerComponent('fullManualDepProto', { managedType: ManagedType.PROTOTYPE, Cls: FullManualDepProto});
	container.registerComponent('fullManualDepSingleton', { managedType: ManagedType.SINGLETON, Cls: FullManualDepSingleton });
	container.registerComponent('fullManualSingleton', { managedType: ManagedType.SINGLETON, Cls: FullManualSingleton });
	container.registerComponent('fullManualSingleton2', { managedType: ManagedType.SINGLETON, Cls: FullManualSingleton2 });

	container.registerDependencies('fullManualDepSingleton', ['fullManualDepProto']);
	container.registerDependencies('fullManualSingleton', ['fullManualDepSingleton', 'fullManualDepProto']);
	container.registerDependencies('fullManualSingleton2', ['fullManualDepSingleton', 'fullManualDepProto']);

}

try {

	const container = getManualContainer('full-manual-container');
	setupContainer(container);

	const logStr = 'Runtime dependency with factory works';
	container.registerOverride('fullManualDepProto', () => new RuntimeDependency(logStr))

	const singleton = container.get('fullManualSingleton');
	singleton.logSingleton();
	singleton.logPrototype();

	console.log(
		treeify.asTree(container.toJSON(), true));


} catch (e) {
	console.error(e);
}