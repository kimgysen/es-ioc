
import './AppConfig';
import './components/DemoSingleton';
import './components/DemoSingleton2';
import './components/DepProto';
import './components/DepSingleton';
import './components/RuntimeDepProto';

import treeify from 'treeify';

import {
	getContainer
} from "../../../../src";

console.log('*****************************');
console.log('*** Test with decorators ***');
console.log('*****************************');

// Container 1
const container_1 = getContainer('decorators-container1');

const cont1_singleton1 = container_1.get('demoSingleton');

cont1_singleton1.logSingleton();
cont1_singleton1.logPrototype();

console.log('container 1:');

console.log(
	treeify.asTree(container_1.toJSON(), true)
);

const cont1_singleton2 = container_1.get('demoSingleton2');

console.log(
	'Do the singletons refer to the same instance? ',
	cont1_singleton1.depSingleton === cont1_singleton2.depSingleton
)

console.log(
	'Do the prototypes refer to the same instance? ',
	cont1_singleton1.depProto === cont1_singleton2.depProto
)

console.log('Override default implementation of depProto:');




// Container 2

const container_2 = getContainer('decorators-container_2');

const cont2_singleton1 = container_2.get('demoSingleton');

console.log(
	'Is the singleton from container 1 referring to the same instance as in container 2?',
	cont1_singleton1.depSingleton === cont2_singleton1.depSingleton
)

console.log('container 2:');
console.log(
	treeify.asTree(container_2.toJSON(), true)
);
