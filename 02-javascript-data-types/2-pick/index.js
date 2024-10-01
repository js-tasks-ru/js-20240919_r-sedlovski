/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const objEntries = Object.entries(obj);
  const new_obj = [];

  for (const entrie of objEntries) {
    if (fields.includes(entrie[0])) {
      new_obj.push(entrie);
    }
  }

  return Object.fromEntries(new_obj);
};
