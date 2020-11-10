
/**
 * Describes the type of dependency
 * Prototype: New instance on every injection
 * Singleton: Use the same instance on every injection
 */
export default Object.freeze({
	PROTOTYPE: Symbol('PROTOTYPE'),
	SINGLETON: Symbol('SINGLETON')
});
