
import { describe, beforeEach, it } from '@jest/globals';
import { getManualContainer, ManagedType } from "../../src";
import WithConfigSingleton from "./test-components/from-config/WithConfigSingleton";
import WithConfigSingleton2 from "./test-components/from-config/WithConfigSingleton2";
import WithConfigDepSingleton from "./test-components/from-config/WithConfigDepSingleton";
import WithConfigDepProto from "./test-components/from-config/WithConfigDepProto";
import RuntimeDependency from "./test-components/manual/RuntimeDependency";



describe('Test container from config', () => {

    const container_1 = getManualContainer('container-1');
    const container_2 = getManualContainer('container-2');

    const config = {
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

    beforeEach(() => {
        container_1.fromJSON(config);
        container_2.fromJSON(config);
    });


    it('Should have 1 singleton instance per container', () => {
        const cont1_singleton1 = container_1.get('manualDemoSingleton');
        const cont1_singleton2 = container_1.get('manualDemoSingleton');
        const cont2_singleton1 = container_2.get('manualDemoSingleton');

        expect(cont1_singleton1).toBeInstanceOf(WithConfigSingleton);
        expect(cont1_singleton2).toBeInstanceOf(WithConfigSingleton);

        expect(cont1_singleton1).toBe(cont1_singleton2);
        expect(cont1_singleton1).not.toBe(cont2_singleton1);

    });

    it('Should get a new ²prototype instance per on each request', () => {
        const cont1_prototype1 = container_1.get('manualDepProto');
        const cont1_prototype2 = container_2.get('manualDepProto');

        expect(cont1_prototype1).toBeInstanceOf(WithConfigDepProto);
        expect(cont1_prototype2).toBeInstanceOf(WithConfigDepProto);
        expect(cont1_prototype1).not.toBe(cont1_prototype2);

    });

    it('Should correctly inject (sub)dependencies', () => {
        // Container 1
        const singleton = container_1.get('manualDemoSingleton');
        const depSingleton = singleton.manualDepSingleton;
        const depSingleton2 = container_1.get('manualDepSingleton');
        const depProto = singleton.manualDepProto;
        const subDepProto = depSingleton.manualDepProto;

        expect(singleton).toBeInstanceOf(WithConfigSingleton);
        expect(depSingleton).toBeInstanceOf(WithConfigDepSingleton);
        expect(depSingleton2).toBeInstanceOf(WithConfigDepSingleton);
        expect(depSingleton).toBe(depSingleton2);

        expect(depProto).toBeInstanceOf(WithConfigDepProto);
        expect(subDepProto).toBeInstanceOf(WithConfigDepProto);

        // Container 2
        const singleton2 = container_2.get('manualDemoSingleton');
        const cont2_depSingleton = singleton2.manualDepSingleton;

        // Check container isolation on injected singleton dependency
        expect(depSingleton).not.toBe(cont2_depSingleton);
    });

    it('Should apply runtime overrides using instance', () => {
        const runtimeObj = new RuntimeDependency();
        container_1.registerOverride('manualDepProto', runtimeObj);

        const depProto = container_1.get('manualDepProto');
        expect(depProto).toBeInstanceOf(RuntimeDependency);
    });

});
