
import AppCtx from "../ApplicationContext";


import {lowerCaseFirstLetter} from "../../util/StringUtil";


/**
 * @Component decorator to annotate components that can be requested from the container
 * @param {symbol} managedType Either PROTOTYPE or SINGLETON
 * @returns {function} decorator
 */
export const ComponentDecorator = (managedType) =>
	target =>
		AppCtx.registerComponent(lowerCaseFirstLetter(target.name), { managedType, Cls: target });


/**
 * @Inject decorator to annotated injected dependencies
 * @returns {function} decorator
 */
export const InjectDecorator = () =>
	(target, key, descriptor) => {

	const registryKey = lowerCaseFirstLetter(target.constructor.name);
	const dependency = lowerCaseFirstLetter(key);
	AppCtx.registerDependency(registryKey, dependency);

	return ({
		... descriptor,
		initializer: () => {
			return AppCtx
				.getContainer(AppCtx.getScopedContainer())
				.get(dependency);
		}
	});
}

export const ConfigDecorator = () =>
		target => {
			const methods = Object
				.getOwnPropertyNames( target.prototype )
				.filter(name => name !== 'constructor')
				.forEach(method =>
					AppCtx.registerOverride(method, target.prototype[method]()));
	};
