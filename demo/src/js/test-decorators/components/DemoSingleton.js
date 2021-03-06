import { ManagedType, Component, Inject } from "es-ioc";


@Component(ManagedType.SINGLETON)
export default class DemoSingleton {

	@Inject()
	depSingleton;

	@Inject()
	depProto;


	getSingletonDependency(){
		return this.depSingleton;
	}

	getPrototypeDependency() {
		return this.depProto;
	}

	logSingleton() {
		this.depSingleton.log();
	}

	logPrototype() {
		this.depProto.log();
	}

}
