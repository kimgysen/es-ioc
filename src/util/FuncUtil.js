/**
 * Parameter is a function
 * @param {object} obj
 * @returns {boolean} Parameter is a function
 */
export const isFunction = obj => {
	const isCtorClass = obj.constructor
		&& obj.constructor.toString().substring(0, 5) === 'function'
	if(obj.prototype === undefined) {
		return isCtorClass
	}
	const isPrototypeCtorClass = obj.prototype.constructor
		&& obj.prototype.constructor.toString
		&& obj.prototype.constructor.toString().substring(0, 8) === 'function'
	return isCtorClass || isPrototypeCtorClass
}