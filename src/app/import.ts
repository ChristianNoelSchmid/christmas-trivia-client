export function importJsonArray<T>(array: any): T[] {
  const values: T[] = [];
  for (let value in array) {
    values.push(array[value]);
  }

  return values.slice(0, values.length - 2);
}
