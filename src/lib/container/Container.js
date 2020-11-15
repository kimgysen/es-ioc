import ManagedType from "../enum/ManagedType";
import ApplicationContext from "../ApplicationContext";
import {mapToObj} from "../../util/jsonUtil";


export default class Container {

	#registry = new Map();
	#singletons = new Map();
	#overrides = new Map();

	constructor(containerName) {
		this.name = containerName;
	}

	/**
	 * Get component from registry
	 * @param {string} key Component key
	 * @returns {object} Component
	 */
	getComponent(key) {
		return this.#registry.get(key);
	}

	/**
	 * Bind AppContext component to container
	 * @param {string} key Component key
	 * @returns {object} The registered component
	 */
	bindComponent(key) {
		const component = ApplicationContext.getComponent(key);
		if (component) {
			this.#registry.set(key, component);
		}
		return component;
	}

	/**
	 * Bind AppContext override instance from @Configuration to container
	 * @param {string} key Override key
	 * @returns {object} The registered override instance
	 */
	bindOverride(key) {
		const override = ApplicationContext.getOverride(key);
		if (override) {
			this.#overrides.set(key, override);
		}
		return override;
	}

	/**
	 * Create component instance
	 * Dependency injection is per default handled by decorators
	 * Manual registration can be  done through the subclass ManualContainer
	 * @param key Component key
	 * @param component Has format { managedType, Cls }
	 * @returns {object}
	 */
	createInstance(key, component) {
		return new component.Cls();
	}


	/**
	 * Get component instance from container
	 * For decorated components, container binding happens when a component instance is requested
	 * @param {string} key Component key
	 * @returns {object} Return Component instance
	 */
	get(key) {
		const override = this.bindOverride(key);

		if (override) {
			return override;

		} else {
			const component = this.bindComponent(key);
			return this.getComponentInstance(key, component);

		}
	}

	/**
	 * Get component instance from container
	 * @param {string} key Component key
	 * @param {object} component Component
	 * @returns {object} Return Component instance
	 */
	getComponentInstance(key, component) {
		if (!component) {
			throw new Error('component ' + key + ' not found.');
		}

		switch (component.managedType) {

			case ManagedType.SINGLETON:
				const instance = this.#singletons.get(key);

				if (instance) {
					return instance;
				} else {
					const singleton = this.createInstance(key, component);
					this.#singletons.set(key, singleton);
					return singleton;
				}

			case ManagedType.PROTOTYPE:
				return this.createInstance(key, component);

		}
	}

	/**
	 * Get component key of all components managed by the container
	 * @returns {array} Array of component key strings
	 */
	getComponentKeys() {
		return Array.from(this.#registry.keys());
	}

	/**
	 * Get json object of all instances and their dependencies as key strings
	 * @returns {object} Json object
	 */
	toJSON() {
		return mapToObj(
			ApplicationContext.getDependencyMap(this));
	}

}
