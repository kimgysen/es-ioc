
/**
 * Convert map to object
 * @param {map} pMap es6 map
 * @returns {object} Returns the converted object
 */
export const mapToObj = pMap => {
	let obj = {};

	for (let [k,v] of pMap) {
		obj[k] = v;
	}

	return obj;

}
