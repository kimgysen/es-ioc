
/**
 * Lower case the first letter of a string
 * @param {string} str String to convert
 * @returns {string} Returns the converted string
 */
export const lowerCaseFirstLetter = str =>
	str.charAt(0).toLowerCase() + str.slice(1);
