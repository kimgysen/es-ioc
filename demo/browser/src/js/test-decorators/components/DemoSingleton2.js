import { Component, Inject } from "../../../../../../js/ioc/src/api";
import ManagedType from "../../../../../../js/ioc/src/lib/enum/ManagedType";


@Component(ManagedType.SINGLETON)
export default class DemoSingleton2 {

	@Inject()
	depSingleton;

	@Inject()
	depProto;


	logSingleton() {
		this.depSingleton.log();
	}

	logPrototype() {
		this.depProto.log();
	}

}
