import { Component, Inject } from "../../../../../../js/ioc/src/api";
import ManagedType from "../../../../../../js/ioc/src/lib/ManagedType";


export default class ManualDemoSingleton {

	constructor(depSingleton, depProto) {
		this.depSingleton = depSingleton;
		this.depProto = depProto;
	}


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
