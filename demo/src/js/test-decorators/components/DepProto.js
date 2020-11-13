import { ManagedType, Component } from "../../../../../lib";


@Component(ManagedType.PROTOTYPE)
export default class DepProto {

	log(){
		console.log('Prototype dependency logged');
	}

}
