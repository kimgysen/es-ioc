

export default class WithConfigDepSingleton {

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
