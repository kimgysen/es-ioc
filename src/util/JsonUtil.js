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


export const mapObjToTree = obj => {
	const tree = {};

	const resolveDeps = (subtree = {}, deps) => {
		if (deps && deps.length > 0) {
			for (let dep of deps) {
				const subDeps = obj[dep];
				if(subDeps && subDeps.length > 0) {
					subtree[dep] = resolveDeps({}, subDeps);
				} else {
					subtree[dep] = {};
				}
			}
			return subtree;
		} else {
			return {};
		}
	}

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			tree[key] = resolveDeps({}, obj[key]);
		}
	}

	return tree;

}