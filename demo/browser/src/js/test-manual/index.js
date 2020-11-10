
import config from './config';

import {
	getContainer
} from "../../../../../js/ioc/src/api";

console.log('*************************************');
console.log('*** Test with manual registration ***');
console.log('*************************************');


try {
	const manualContainer = getContainer('manual-container');
	manualContainer.fromJSON(config);

	const cont1_singleton1 = manualContainer.get('manualDemoSingleton');

	cont1_singleton1.logSingleton();
	cont1_singleton1.logPrototype();

	console.log(manualContainer.toJSON());

} catch(e) {
	console.error(e);
}

