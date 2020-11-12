import { Component, Inject } from "../../../../../../js/ioc/src/api";
import ManagedType from "../../../../../../js/ioc/src/lib/enum/ManagedType";


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
