
import config from './config';

import {
	getManualContainer
} from "../../../../lib";

import treeify from "treeify";

console.log('*************************************');
console.log('*** Test with manual registration ***');
console.log('*************************************');


try {
	const manualContainer = getManualContainer('manual-container');

	manualContainer.fromJSON(config);

	const cont1_singleton1 = manualContainer.get('manualDemoSingleton');

	cont1_singleton1.logSingleton();
	cont1_singleton1.logPrototype();


	console.log(
		treeify.asTree(manualContainer.toJSON(), true)
	);

} catch(e) {
	console.error(e);
}
