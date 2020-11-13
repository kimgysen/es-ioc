

export default class ManualDepSingleton {

	constructor(manualDepProto) {
		this.manualDepProto = manualDepProto;
	}

	log(){
		console.log('Singleton dependency logged');
		this.logSub();
	}

	logSub() {
		console.log('Sub-protodependency logged');
	}

}
