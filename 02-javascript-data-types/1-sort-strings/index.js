/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const new_arr = arr.slice();
  const locales = ["ru", "en"];
  const options = { sensitivity: "variant", caseFirst: "upper" };
  const collator = new Intl.Collator(locales, options);

  if (param === "asc") {
    return new_arr.sort((a, b) => collator.compare(a, b));
  }
  return new_arr.sort((a, b) => collator.compare(b, a));
}
