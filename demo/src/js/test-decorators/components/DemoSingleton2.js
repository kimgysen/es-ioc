import { ManagedType, Component, Inject } from "es-ioc";

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
