import { ManagedType, Component } from "es-ioc";


@Component(ManagedType.PROTOTYPE)
export default class DepProto {

	log(){
		console.log('Prototype dependency logged');
	}

}
