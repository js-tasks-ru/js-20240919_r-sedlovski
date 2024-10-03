/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
// export
export function trimSymbols(string, size) {
  const str_arr = [];
  let prev_symbol = undefined;
  let counter = 0;
  if (size == 0) {
    return "";
  }
  for (const symbol of string) {
    if (prev_symbol == undefined) {
      prev_symbol = symbol;
      str_arr.push(symbol);
      counter++;
      continue;
    }
    if (prev_symbol != symbol) {
      counter = 1;
      prev_symbol = symbol;
      str_arr.push(symbol);
    } else {
      if (counter >= size) {
        continue;
      } else {
        str_arr.push(symbol);
        counter++;
      }
    }
  }
  return str_arr.join("");
}

// console.log(trimSymbols("xxxaaxx", 1));
