
import ManagedType from "../../../../../js/ioc/src/lib/enum/ManagedType";
import ManualDemoSingleton from "./components/ManualDemoSingleton";
import ManualDemoSingleton2 from "./components/ManualDemoSingleton2";
import ManualDepSingleton from "./components/ManualDepSingleton";
import ManualDepProto from "./components/ManualDepProto";


export default {
	manualDemoSingleton: {
		managedType: ManagedType.SINGLETON,
		dependencies: ['manualDepSingleton', 'manualDepProto'],
		Cls: ManualDemoSingleton
	},

	manualDemoSingleton2: {
		managedType: ManagedType.SINGLETON,
		dependencies: ['manualDepSingleton', 'manualDepProto'],
		Cls: ManualDemoSingleton2
	},

	manualDepSingleton: {
		managedType: ManagedType.SINGLETON,
		dependencies: ['manualDepProto'],
		Cls: ManualDepSingleton
	},

	manualDepProto: {
		managedType: ManagedType.PROTOTYPE,
		Cls: ManualDepProto
	}

}
