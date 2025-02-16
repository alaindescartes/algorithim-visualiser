export function generateRandomNumbers(size: number): Array<number> {
  const unsortedArray: Array<number> = [];

  while (unsortedArray.length < size) {
    const rand: number = Math.floor(Math.random() * (size * 10));
    if (!unsortedArray.includes(rand)) {
      unsortedArray.push(rand);
    }
  }

  return unsortedArray;
}
