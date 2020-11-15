import Container from "./container/Container";
import ManualContainer from './container/ManualContainer';


let scopedContainer = '';

const containerRegistry = new Map();
const componentRegistry = new Map();
const dependencyRegistry = new Map();
const overridesRegistry = new Map();


/**
 * Get container name for which a component is currently being requested
 * @returns {string} Returns the scoped container name
 */
const getScopedContainer = () => scopedContainer;


/**
 * Get container from ApplicationContext
 * @param {string} name Name of the container
 * @returns {object} Returns a proxy to the original container
 */
const	getContainer = (name) => findOrdCreateContainer(name);


/**
 * Get container from ApplicationContext
 * Manual means that the container registers its dependencies manually, not through decorators / annotations
 * @param name
 * @returns {object} Returns a proxy to the original container
 */
const getManualContainer = name => findOrdCreateContainer(name, true);


/**
 * Find or create and register a new container
 * @param {string} name Name of the container
 * @param {boolean} isManual Indicates whether the container registers components manually, or automagically (annotations)
 * @returns {object} Returns a proxy to the original container
 */
const findOrdCreateContainer = (name, isManual = false) =>
	containerRegistry.get(name)
	|| registerNewContainer(name, isManual);


/**
 * Registers a proxy container to the ApplicationContext
 * @param {string} name Name of the container
 * @param {boolean} isManual Indicates whether the container registers components manually, or automagically (annotations)
 * @returns {object} Returns a proxy to the original container
 */
const registerNewContainer = (name, isManual) => {
	const container = isManual ?
		new ManualContainer(name)
	: new Container(name);
	const proxy = getContainerProxy(container);
	containerRegistry.set(name, proxy);
	return proxy;
}

/**
 * Create proxy object from a native container
 * This sets the current containerScope when a component is requested from a container
 * @param {object} container The original container
 * @returns {object} A proxy to the original container
 */
const getContainerProxy = container => {
	return new Proxy(container, {
		get: (target, prop) => {
			const origMethod = target[prop];
			return (...args) => {
				if (prop === 'get') {
					scopedContainer = target.name;
				}
				return origMethod.apply(target, args);
			}
		}
	})
}


/**
 * Registers a component to the ApplicationContext
 * @param {string} key
 * @param {object} component Component to be registered
 */
const registerComponent = (key, component) => {
	componentRegistry.set(key, component);
}

/**
 * Get component from the ApplicationContext
 * @param {string} key Component key
 * @returns {object} Returns the requested component
 */
const getComponent = key => componentRegistry.get(key);

/**
 * Get override from the ApplicationContext
 * @param {string} key Override key
 * @returns {object} Returns the requested override
 */
const getOverride = key => overridesRegistry.get(key);

/**
 * Register dependency to the ApplicationContext
 * The dependency registry is formatted as { 'dependent': [ dependencies ] }
 * @param {string} key Component key
 * @param {string} dependency
 */
const registerDependency = (key, dependency) => {
	if (!dependencyRegistry.get(dependency))
		dependencyRegistry.set(dependency, [])

	const dependencies = dependencyRegistry.get(key) || [];
	dependencies.push(dependency);
	dependencyRegistry.set(key, dependencies);

}

/**
 * Register a component instance that overrides the default component injection through @Configuration
 * @param {string} key
 * @param {object} instance
 */
const registerOverride = (key, instance) => {
	overridesRegistry.set(key, instance);
}

/**
 * Get dependencies from ApplicationContext
 * @param {string} key Component key
 * @returns {array} Dependencies for a component as an array of key strings
 */
const getDependencies = key => dependencyRegistry.get(key);


/**
 * Get dependency tree for container
 * @param {object} container Proxy to the original container
 * @returns {object} Json tree
 */
const getDependencyMap = container => {
	const containerComponents = containerRegistry
		.get(container.name)
		.getComponentKeys();

	return new Map([...dependencyRegistry]
		.filter(([key]) => containerComponents.includes(key)));

}


export default {
	getScopedContainer,
	getContainer,
	getManualContainer,
	registerComponent,
	registerOverride,
	getComponent,
	getOverride,
	registerDependency,
	getDependencies,
	getDependencyMap
};
