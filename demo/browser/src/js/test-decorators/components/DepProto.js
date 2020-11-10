import {Component} from "../../../../../../js/ioc/src/api";
import ManagedType from "../../../../../../js/ioc/src/lib/ManagedType";


@Component(ManagedType.PROTOTYPE)
export default class DepProto {

	log(){
		console.log('Prototype dependency logged');
	}

}
