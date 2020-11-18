import ManagedType from "../enum/ManagedType";
import {isFunction} from "../../util/FuncUtil";


/**
 * Validate configuration to import json on manual container
 * @param {object} config Configuration json to import
 * @returns {boolean} isValid
 */
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


/**
 * Validate managedType parameter
 * @param {object} props Configuration properties
 */
const validateManagedType = props => {
	if (!props.managedType) {
		throw new Error('managedType key is missing');
	}

	if (props.managedType.toString() !== ManagedType.PROTOTYPE.toString()
		&& props.managedType.toString() !== ManagedType.SINGLETON.toString()) {
		throw new Error('managedType prop has invalid value');
	}
}


/**
 * Validate managedType parameter
 * @param {object} props Configuration properties
 */
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


/**
 * Check if parameter is an object
 * @param obj Parameter to check
 * @returns {boolean} Parameter is an object
 */
const isObject = obj => typeof obj === 'object' && obj !== null;

