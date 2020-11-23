
import {Configuration} from "es-ioc";
import RuntimeDependency from "./components/RuntimeDependency";


@Configuration()
export default class AppConfig {

	depProto() {
		return new RuntimeDependency();
	}

}
