import { ManagedType, Component, Inject } from "../../../../src";


export default class DepSingleton {

	constructor(depProto) {
		this.depProto = depProto;
	}

	log(){
		console.log('Singleton dependency logged');
		this.logSub();
	}

	logSub() {
		console.log('Sub-protodependency logged');
	}

}
