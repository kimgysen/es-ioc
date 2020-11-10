import Container from "./Container";
import {strMapToObj} from "../util/jsonUtil";


let scopedContainer = '';

const containerRegistry = new Map();
const componentRegistry = new Map();
const dependencyRegistry = new Map();

const getScopedContainer = () => scopedContainer;


const	getContainer = (name, options) => {
		return findOrdCreateContainer(name);
	}

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

const registerNewContainer = name => {
	const container = new Container(name);
	const proxy = getContainerProxy(container);
	containerRegistry.set(name, proxy);
	return proxy;
}

const registerComponent = (registryKey, component) => {
	componentRegistry.set(registryKey, component);
}

const getComponent = registryKey => componentRegistry.get(registryKey);

const registerDependency = (registryKey, dependency) => {
	const dependencies = dependencyRegistry.get(registryKey) || [];
	dependencies.push(dependency);
	dependencyRegistry.set(registryKey, dependencies);

	// Let's also add a key for dependencies objects that don't have dependencies themselves
	// This makes it easier to print out the entire dependency tree
	if (!dependencyRegistry.get(dependency))
		dependencyRegistry.set(dependency, [])
}

const getDependencies = registryKey => dependencyRegistry.get(registryKey);

const findOrdCreateContainer = (name) =>
	containerRegistry.get(name)
		|| registerNewContainer(name);


const getTree = pContainer => {
	const containerComponents = containerRegistry
		.get(pContainer.name)
		.getAllComponents();

	const dependencies = new Map([...dependencyRegistry]
		.filter(([key]) => containerComponents.includes(key)));

	return strMapToObj(dependencies);
}


export default {
	getScopedContainer,
	getContainer,
	registerComponent,
	getComponent,
	registerDependency,
	getDependencies,
	getTree
};
