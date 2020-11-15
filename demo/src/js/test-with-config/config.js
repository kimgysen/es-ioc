
import WithConfigSingleton from "./components/WithConfigSingleton";
import WithConfigSingleton2 from "./components/WithConfigSingleton2";
import WithConfigDepSingleton from "./components/WithConfigDepSingleton";
import WithConfigDepProto from "./components/WithConfigDepProto";

import { ManagedType } from "../../../../src";


export default {
	manualDemoSingleton: {
		managedType: ManagedType.SINGLETON,
		dependencies: ['manualDepSingleton', 'manualDepProto'],
		Cls: WithConfigSingleton
	},

	manualDemoSingleton2: {
		managedType: ManagedType.SINGLETON,
		dependencies: ['manualDepSingleton', 'manualDepProto'],
		Cls: WithConfigSingleton2
	},

	manualDepSingleton: {
		managedType: ManagedType.SINGLETON,
		dependencies: ['manualDepProto'],
		Cls: WithConfigDepSingleton
	},

	manualDepProto: {
		managedType: ManagedType.PROTOTYPE,
		Cls: WithConfigDepProto
	}

}
