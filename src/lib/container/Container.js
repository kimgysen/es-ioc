import ManagedType from "../enum/ManagedType";
import ApplicationContext from "../ApplicationContext";
import {mapObjToTree, mapToObj} from "../../util/JsonUtil";


export default class Container {

	#registry = new Map();
	#singletons = new Map();
	#overrides = new Map();

	constructor(containerName) {
		this.name = containerName;
	}

	/**
	 * Resolve overrides on dependencies recursively
	 * @param {object} instance
	 * @returns The resolved instance
	 */
	#resolveOverrides(instance) {
		const resolve = (instance, props) => props.forEach(dep => {
			if (this.hasOverride(dep)) {
				instance[dep] = this.#overrides.get(dep);
			} else {
				resolve(instance[dep], Object.keys(instance[dep]));
			}
		});

		resolve(instance, Object.keys(instance));
		return instance;
	}

	/**
	 * Store singleton instance in singletons registry
	 * @param {string} key Singleton component key
	 * @param {object} singleton The singleton instance
	 */
	registerSingleton(key, singleton) {
		this.#singletons.set(key, singleton);
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
	 * Get singleton from singletons registry
	 * @param {string} key Singleton key
	 * @returns {object} Singleton component
	 */
	getSingleton(key) {
		return this.#singletons.get(key);
	}

	/**
	 * Get override instance
	 * @param {string} key Component key overridden
	 * @returns {object} The override instance
	 */
	getOverride(key) {
		return this.#overrides.get(key);
	}

	/**
	 * Does override exist
	 * @param {string} key Override key
	 * @returns {boolean} Yes / no
	 */
	hasOverride(key) {
		return this.#overrides.has(key);
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
	 * Manual registration can be  done through the subclass ManualContainer, which overrides this method
	 * @param {string} key Component key
	 * @param {object} component Has format { managedType, Cls }
	 * @returns {object} Created instance
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
		const component = this.bindComponent(key);
		return this.getComponentInstance(key, component, override);
	}

	/**
	 * Get component instance from container
	 * @param {string} key Component key
	 * @param {object} component Component
	 * @param {object} override Runtime override instance
	 * @returns {object} Return Component instance
	 */
	getComponentInstance(key, component, override) {
		if (!component) {
			throw new Error('Component ' + key + ' not available in the registry.');
		}

		if (override) {
			return override;

		} else {
			switch (component.managedType) {

				case ManagedType.SINGLETON:
					const instance = this.getSingleton(key);

					if (instance) {
						return this.#resolveOverrides(instance);

					} else {
						const singleton = this.createInstance(key, component);
						this.registerSingleton(key, singleton);
						return singleton;
					}

				case ManagedType.PROTOTYPE:
					return this.createInstance(key, component);

			}
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
		return mapObjToTree(
			mapToObj(
				ApplicationContext.getDependencyMap(this))
		);
	}

}
