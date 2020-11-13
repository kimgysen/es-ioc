import Container from "./Container";
import {validateConfig} from "./ValidateConfig";
import ApplicationContext from "../ApplicationContext";


export default class ManualContainer extends Container {

	constructor(containerName) {
		super(containerName);
	}


	/**
	 * Create component instance and inject its dependencies on manual container
	 * @param {string} key Registry key of component
	 * @param {object} component Component to instantiate
	 * @returns {object} Create manual component instance
	 */
	createInstance(key, component) {
			const depKeys = ApplicationContext.getDependencies(key);
			return this.resolveDependencies(component.Cls, depKeys);
	}


	/**
	 * Register component on manual container
	 * @param {string} key Component key
	 * @param {object} component Register component to container
	 */
	registerComponent(key, component) {
		ApplicationContext.registerComponent(key, component);
		super.registerComponent(key, component);
	}


	/**
	 * Register dependencies
	 * @param {string} key Key of component
	 * @param {array} deps Array of dependencies as key strings
	 */
	registerDependencies(key, deps) {
		deps.forEach(
				dep => ApplicationContext.registerDependency(key, dep));
	}


	/**
	 * Resolve dependencies, i.e. create instances of injected dependencies
	 * @param {function} Cls Component class constructor
	 * @param {array} dependencyKeys Array of dependencies as key strings
	 * @returns {object} Returns component instances and their resolved dependencies
	 */
	resolveDependencies(Cls, dependencyKeys) {
		const depInstances = dependencyKeys.map(depKey => {
			const depComponent = ApplicationContext.getComponent(depKey);
			const subDepKeys = ApplicationContext.getDependencies(depKey);

			if (subDepKeys.length > 0) {
				return this.resolveDependencies(depComponent.Cls, subDepKeys);
			} else {
				return new depComponent.Cls();
			}
		});

		return new Cls(...depInstances);
	}


	/**
	 * Register container components based on imported JSON configuration
	 * @param {object} config
	 */
	fromJSON(config) {
		validateConfig(config);

		for (const [key, { managedType, Cls, dependencies = [] }] of Object.entries(config)) {
			const component = { managedType, Cls }
			this.registerComponent(key, component);
			this.registerDependencies(key, dependencies)
		}

	}

}

