

export default class DemoSingleton {

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
