

export default class FullManualDepSingleton {

	constructor(fullManualDepProto) {
		this.fullManualDepProto = fullManualDepProto;
	}

	log(){
		console.log('Singleton dependency logged');
		this.logSub();
	}

	logSub() {
		console.log('Sub-protodependency logged');
	}

}
