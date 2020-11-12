
import { ComponentDecorator, InjectDecorator } from "../lib/decorator/Decorators";
import ApplicationContext from "../lib/ApplicationContext";


export const Component = managedType =>
	ComponentDecorator(managedType);


export const Inject = () =>
	InjectDecorator();


export const getContainer = ApplicationContext.getContainer;
export const getManualContainer = ApplicationContext.getManualContainer;

