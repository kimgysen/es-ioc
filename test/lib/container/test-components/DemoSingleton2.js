import { ManagedType, Component, Inject } from "../../../../src";


export default class DemoSingleton2 {

	constructor(depSingleton, depProto) {
		this.depSingleton = depSingleton;
		this.depProto = depProto;
	}

	logSingleton() {
		this.depSingleton.log();
	}

	logPrototype() {
		this.depProto.log();
	}

}
