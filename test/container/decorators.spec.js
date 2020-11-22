
import { describe, it } from '@jest/globals';
import { ComponentDecorator, InjectDecorator, ConfigDecorator } from "../../src/lib/decorator/Decorators";
import ApplicationContext from "../../src/lib/ApplicationContext";
import { getManualContainer, Inject, ManagedType } from "../../src";
import RuntimeDependency from "./test-components/RuntimeDependency";

// Test class declarations
class TestDependencyCls {}
class TestRuntimeOverride {}
class TestCls {
    name = 'TestCls';
    testDependencyCls = null;
}


describe('Test decorators', () => {

    it('Should return a function that registers a component to the ApplicationContext', () => {
        const fn = ComponentDecorator(ManagedType.SINGLETON);
        fn(new TestCls());
        const component =  ApplicationContext.getComponent('testCls');

        expect(component.managedType).toEqual(ManagedType.SINGLETON);
        expect(component.Cls).toBeInstanceOf(TestCls);
    });

    it('Should return a function that registers a to be injected dependency to the ApplicationContext', () => {
        const fn = InjectDecorator();
        fn(new TestCls(), 'testDependency', {});
        // Babel minifies target.constructor.name, need to verify how to disable this
        const dependencies = ApplicationContext.getDependencies('a');

        expect(dependencies.values().next().value).toEqual('testDependency');
   });

    it('Should return an initializer that gets a dependency from the scoped container', () => {
        const container = getManualContainer('test-container');
        container.registerComponent('testDependency', { managedType: ManagedType.SINGLETON, Cls: TestDependencyCls });
        const dependency = container.get('testDependency');

        const fn = InjectDecorator();
        const { initializer } = fn(new TestCls(), 'testDependency', {});
        const depInstance = initializer();

        expect(depInstance).toBeInstanceOf(TestDependencyCls);
        expect(dependency).toBe(depInstance);
    });

    it('Should return a function that registers a runtime override', () => {
        const container = getManualContainer('test-container');
        container.registerComponent('testCls', { managedType: ManagedType.SINGLETON, Cls: TestCls });
        container.registerComponent('testDependency', { managedType: ManagedType.SINGLETON, Cls: TestDependencyCls });
        container.registerDependencies('testCls', ['testDependency']);

        const fn = ConfigDecorator();
        fn({ prototype: { testDependency: () => new TestRuntimeOverride() } });

        const override = ApplicationContext.getOverride('testDependency');
        expect(override).toBeInstanceOf(TestRuntimeOverride);
    });

});
