/**
 * Annotation decorators
 */
import {lowerCaseFirstLetter} from "../util/StringUtil";


export const ComponentDecorator = (AppCtx, managedType) =>
	target =>
		AppCtx.registerComponent(lowerCaseFirstLetter(target.name), { managedType, Cls: target });


export const InjectDecorator = AppCtx =>
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
