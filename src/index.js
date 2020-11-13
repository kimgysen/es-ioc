
import { ComponentDecorator, InjectDecorator } from "./lib/decorator/Decorators";
import pManagedType from "./lib/enum/ManagedType";
import ApplicationContext from "./lib/ApplicationContext";


export const Component = managedType =>
	ComponentDecorator(managedType);


export const Inject = () =>
	InjectDecorator();


export const ManagedType = pManagedType;
export const getContainer = ApplicationContext.getContainer;
export const getManualContainer = ApplicationContext.getManualContainer;


