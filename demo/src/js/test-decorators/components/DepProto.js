import { ManagedType, Component } from "../../../../../src";


@Component(ManagedType.PROTOTYPE)
export default class DepProto {

	log(){
		console.log('Prototype dependency logged');
	}

}
