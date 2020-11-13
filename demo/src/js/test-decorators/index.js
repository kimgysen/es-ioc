
import './components/DemoSingleton';
import './components/DemoSingleton2';
import './components/DepProto';
import './components/DepSingleton';

import treeify from 'treeify';

import {
	getContainer
} from "../../../../lib";

console.log('*****************************');
console.log('*** Test with decorators ***');
console.log('*****************************');

// Container 1
const container1 = getContainer('decorators-container1');

const cont1_singleton1 = container1.get('demoSingleton');

cont1_singleton1.logSingleton();
cont1_singleton1.logPrototype();


const cont1_singleton2 = container1.get('demoSingleton2');

console.log(
	'Is the singleton referring to the same reference in singleton demo 1 and 2?',
	cont1_singleton1.depSingleton === cont1_singleton2.depSingleton
)

console.log(
	'Is the prototype referring to the same reference in singleton demo 1 and 2?',
	cont1_singleton1.depProto === cont1_singleton2.depProto
)

// Container 2

const container2 = getContainer('decorators-container2');

const cont2_singleton1 = container2.get('demoSingleton');

console.log(
	'Is the singleton from container 1 referring to the same instance as in container 2?',
	cont1_singleton1.depSingleton === cont2_singleton1.depSingleton
)


console.log(
	'container1',
	treeify.asTree(container1.toJSON(), true)
);

console.log(
	'container2',
	treeify.asTree(container2.toJSON(), true)
);
