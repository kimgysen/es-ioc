import ManagedType from "../enum/ManagedType";
import ApplicationContext from "../ApplicationContext";


export default class Container {

	#registry = new Map();
	#singletons = new Map();


	constructor(containerName) {
		this.name = containerName;
	}


	/**
	 * Bind AppContext component to container
	 * @param {string} key Component key
	 */
	#bindComponent(key) {
		const component = ApplicationContext.getComponent(key);
		this.registerComponent(key, component);
	}


	/**
	 * Create component instance
	 * @param key Component key
	 * @param component Has format { managedType, Cls }
	 * @returns { Object }
	 */
	createInstance(key, component) {
		return new component.Cls();
	}


	/**
	 * Register component to container
	 * @param {string} key Registry key of component
	 * @param {object} component
	 */
	registerComponent(key, component) {
		this.#registry
			.set(key, component);
	}


	/**
	 * Get component instance from container
	 * @param {string} key Component key
	 * @returns {object} Return Component instance
	 */
	get(key) {
		this.#bindComponent(key);
		const component = this.#registry.get(key);

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
	 * @returns {array} Array of component keys
	 */
	getAllComponents() {
		return Array.from(this.#registry.keys());
	}


	/**
	 * Get json tree of all instances and their dependencies as a tree
	 * @returns {object} Json tree
	 */
	toJSON() {
		return ApplicationContext.getTree(this);
	}

}
