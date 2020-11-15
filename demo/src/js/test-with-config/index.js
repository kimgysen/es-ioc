
import config from './config';

import {
	getManualContainer
} from "../../../../src";

import treeify from "treeify";

console.log('****************************************************');
console.log('*** Test with manual registration through config ***');
console.log('****************************************************');


try {
	const container = getManualContainer('with-config-container');

	container.fromJSON(config);

	const cont1_singleton1 = container.get('manualDemoSingleton');

	cont1_singleton1.logSingleton();
	cont1_singleton1.logPrototype();


	console.log(
		treeify.asTree(container.toJSON(), true)
	);

} catch(e) {
	console.error(e);
}

