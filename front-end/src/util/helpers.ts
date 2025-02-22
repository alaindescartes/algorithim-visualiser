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

export const sendUnsortedArray = async (arrSize: number) => {
  const unSortedArr = generateRandomNumbers(arrSize);
  try {
    const res = await fetch("http://0.0.0.0:8000/getRandArray", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr: unSortedArr }),
    });

    if (!res.ok) {
      throw new Error("Failed to send data");
    }

    const result = await res.json();
  } catch (error) {
    const err = error as Error;
    console.log("there was an error while sending data:" + err.message);
  }
};
