/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  // Два массива:
  // один для свойств старого объекта, другой для свойств нового\возвращаемого объекта
  const objEntries = Object.entries(obj);
  const new_obj = new Array();

  //   Перебор искомых свойств в массиве свойств fields
  for (let entrie of objEntries) {
    if (fields.includes(entrie[0])) {
      new_obj.push(entrie);
    }
  }

  return Object.fromEntries(new_obj);
};
