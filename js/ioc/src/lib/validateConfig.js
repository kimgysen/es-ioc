import ManagedType from "./ManagedType";


export const validateConfig = config => {

	if (!isObject(config)) {
		throw new Error('Passed in config is not an object');
	}

	const keys = Object.keys(config);
	const props = Object.values(config);

	for (let prop of props) {

		validateManagedType(prop);
		validateDependencies(prop);
		validateDependenciesExist(keys, prop);
		validateClass(prop);

	}

	return true;

}

const validateManagedType = props => {
	if (!props.managedType) {
		throw new Error('managedType key is missing');
	}

	if (String(props.managedType) !== String(ManagedType.PROTOTYPE)
		&& String(props.managedType) !== String(ManagedType.SINGLETON)) {
		throw new Error('managedType prop has invalid value');
	}
}

const validateDependencies = props => {
	if (props.dependencies && !Array.isArray(props.dependencies)) {
		throw new Error('dependencies prop must be an array')
	}
}

const validateDependenciesExist = (keys, props) => {
	const deps = props.dependencies;
	if(deps && deps.length > 0) {
		for (let dependency of deps) {
			if(! keys.includes(dependency)) {
				throw new Error(`Dependency: ${ dependency } doesn\'t have a corresponding key`);
			}
		}
	}
}

const validateClass = (props) => {

	if (!props.Cls) {
		throw new Error('Cls key is missing');
	}

	if (!isFunction(props.Cls)) {
		throw new Error('Cls key must be a class');
	}

}


// Utility functions

const isObject = obj => typeof obj === 'object' && obj !== null;


const isFunction = obj => {
	const isCtorClass = obj.constructor
		&& obj.constructor.toString().substring(0, 5) === 'function'
	if(obj.prototype === undefined) {
		return isCtorClass
	}
	const isPrototypeCtorClass = obj.prototype.constructor
		&& obj.prototype.constructor.toString
		&& obj.prototype.constructor.toString().substring(0, 8) === 'function'
	return isCtorClass || isPrototypeCtorClass
}
