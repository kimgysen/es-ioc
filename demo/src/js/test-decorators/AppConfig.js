
import {Configuration} from "../../../../src";
import RuntimeDepProto from "./components/RuntimeDepProto";


@Configuration()
export default class AppConfig {


	depProto() {
		return new RuntimeDepProto();
	}

}
