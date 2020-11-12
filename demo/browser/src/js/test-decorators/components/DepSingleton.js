import {Component, Inject} from "../../../../../../js/ioc/src/api";
import ManagedType from "../../../../../../js/ioc/src/lib/enum/ManagedType";


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
