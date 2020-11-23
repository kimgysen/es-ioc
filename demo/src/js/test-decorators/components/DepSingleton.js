import { ManagedType, Component, Inject } from "es-ioc";


@Component(ManagedType.SINGLETON)
export default class DepSingleton {

	@Inject()
	depProto;

	log(){
		console.log('Singleton dependency logged');
		this.logSub();
	}

	logSub() {
		console.log('Sub-protodependency logged');
	}

}
