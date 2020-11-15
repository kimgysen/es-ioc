

export default class FullManualSingleton {

	constructor(fullManualDepSingleton, fullManualDepProto) {
		this.fullManualDepSingleton = fullManualDepSingleton;
		this.fullManualDepProto = fullManualDepProto;
	}


	getSingletonDependency(){
		return this.fullManualDepSingleton;
	}

	getPrototypeDependency() {
		return this.fullManualDepProto;
	}

	logSingleton() {
		this.fullManualDepSingleton.log();
	}

	logPrototype() {
		this.fullManualDepProto.log();
	}

}
