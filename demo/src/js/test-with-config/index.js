
import config from './config';

import {
	getManualContainer
} from "es-ioc";

import treeify from "treeify";
import RuntimeDependency from "./components/RuntimeDependency";


console.log('****************************************************');
console.log('*** Test with manual registration through config ***');
console.log('****************************************************');

try {
	const container = getManualContainer('with-config-container');

	container.fromJSON(config);
	container.registerOverride('manualDepProto', new RuntimeDependency)


	const singleton = container.get('manualDemoSingleton');

	singleton.logSingleton();
	singleton.logPrototype();


	console.log(
		treeify.asTree(container.toJSON(), true)
	);

} catch(e) {
	console.error(e);
}

