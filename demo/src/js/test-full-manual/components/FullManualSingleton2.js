
export default class FullManualSingleton2 {

	constructor(fullManualDepSingleton, fullManualDepProto) {
		this.fullManualDepSingleton = fullManualDepSingleton;
		this.fullManualDepProto = fullManualDepProto;
	}

	logSingleton() {
		this.fullManualDepSingleton.log();
	}

	logPrototype() {
		this.fullManualDepProto.log();
	}

}
