import ManagedType from "./ManagedType";
import ApplicationContext from "./ApplicationContext";
import {validateConfig} from "./validateConfig";


export default class Container {

	#registry = new Map();
	#singletons = new Map();

	// Defaults to the use of annotation decorators
	// When fromJSON is used, manual container mode is activated
	#manual = false;

	constructor(containerName) {
		this.name = containerName;
	}

	#createInstance(registryKey, service, manual = false) {
		if (!this.#manual) {
			return new service.Cls();

		} else {
			const dependencyKeys = ApplicationContext.getDependencies(registryKey);
			return this.#createManualInstance(service, dependencyKeys);
		}
	}

	#createManualInstance(service, dependencyKeys) {
		return this.#resolveDependencies(service.Cls, dependencyKeys);
	}

	#bindComponent(registryKey) {
		const { managedType, Cls } = ApplicationContext.getComponent(registryKey);
		this.register(registryKey, managedType, Cls);
	}

	#resolveDependencies(Cls, dependencyKeys) {
		const depInstances = dependencyKeys.map(depKey => {
			const depService = ApplicationContext.getComponent(depKey);
			const subDepKeys = ApplicationContext.getDependencies(depKey);

			if (subDepKeys.length > 0) {
				return this.#resolveDependencies(depService.Cls, subDepKeys);
			} else {
				return new depService.Cls();
			}
		});

		return new Cls(...depInstances);
	}

	#registerManual(registryKey, managedType, Cls, dependencies = []) {
		ApplicationContext.registerComponent(registryKey, { managedType, Cls });
		this.register(registryKey, managedType, Cls);
		dependencies
			.forEach(dependency =>
				ApplicationContext.registerDependency(registryKey, dependency));
	}

	register(registryKey, managedType, Cls) {
		this.#registry
			.set(registryKey, { Cls, managedType });
	}

	get(registryKey) {
		this.#bindComponent(registryKey);
		const service = this.#registry.get(registryKey);

		if (!service) {
			throw new Error('Service ' + registryKey + ' not found.');
		}

		switch (service.managedType) {

			case ManagedType.SINGLETON:
				const instance = this.#singletons.get(registryKey);

				if (instance) {
					return instance;
				} else {
					const singleton = this.#createInstance(registryKey, service);
					this.#singletons.set(registryKey, singleton);
					return singleton;
				}

			case ManagedType.PROTOTYPE:
				return this.#createInstance(registryKey, service);

		}
	}

	getAllComponents() {
		return Array.from(this.#registry.keys());
	}

	fromJSON(config) {

		validateConfig(config);

		this.#manual = true;
		for (const [service, props] of Object.entries(config)) {
			this.#registerManual(service, props.managedType, props.Cls, props.dependencies);
		}


	}

	toJSON() {
		return ApplicationContext.getTree(this);
	}

}
