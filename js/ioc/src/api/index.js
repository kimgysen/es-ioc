
import { ComponentDecorator, InjectDecorator } from "../lib/decorators";
import ApplicationContext from "../lib/ApplicationContext";


export const Component = managedType =>
	ComponentDecorator(ApplicationContext, managedType);


export const Inject = () =>
	InjectDecorator(ApplicationContext);


export const getContainer = ApplicationContext.getContainer;
export const registerComponent = ApplicationContext.registerComponent;
export const getTree = ApplicationContext.getTree;

