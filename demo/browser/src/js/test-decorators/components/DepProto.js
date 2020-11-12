import {Component} from "../../../../../../js/ioc/src/api";
import ManagedType from "../../../../../../js/ioc/src/lib/enum/ManagedType";


@Component(ManagedType.PROTOTYPE)
export default class DepProto {

	log(){
		console.log('Prototype dependency logged');
	}

}
