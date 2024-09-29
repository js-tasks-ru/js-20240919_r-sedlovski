/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  // Нужно для того, чтобы не изменять исходный массив
  const new_arr = arr.slice();

  if (param === "asc") {
    // Сначала хотел реализовать в виде передачи самописной функции с параметром сортировки,
    // но не разобрался, как передать функцию с аргументами в функцию сортировки
    return new_arr.sort(function (a, b) {
      if (a.toLowerCase() === b.toLowerCase()) {
        // По умолчнию в верхнем регистре буква больше, поэтому делаем реверс
        return 0 - a.localeCompare(b);
      } else {
        return a.localeCompare(b);
      }
    });
  } else if (param === "desc") {
    return new_arr.sort(function (a, b) {
      if (a.toLowerCase() === b.toLowerCase()) {
        return 0 - b.localeCompare(a);
      } else {
        return b.localeCompare(a);
      }
    });
  } else {
    // Если передали что-то олтличное от 'asc' и 'desc'
    console.log("param может принимать либо asc, либо desc");
  }
}
