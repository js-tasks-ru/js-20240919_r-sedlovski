/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const props = path.split(".");
  return function (obj) {
    let search_obj = obj;
    for (const prop of props) {
      if (typeof search_obj[prop] == "object" && search_obj[prop] != null) {
        search_obj = search_obj[prop];
      } else if (!search_obj.hasOwnProperty(prop)) {
        return undefined;
      } else {
        return search_obj[prop];
      }
    }
  };
}
