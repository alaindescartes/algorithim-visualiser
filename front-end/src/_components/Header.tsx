import { JSX, useEffect, useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/Users/alaindescartesuwishema/Desktop/projects/algorithim-visualiser/front-end/src/components/ui/select.tsx";
import { Button } from "@/components/ui/button";
import { generateRandomNumbers } from "@/util/helpers";
import { ControllerContext } from "./ControllerProvider";

function Header(): JSX.Element {
  const { isSorting, size, setController } = useContext(ControllerContext);

  useEffect(() => {
    const sendUnsortedArray = async () => {
      const unSortedArr = generateRandomNumbers(size);
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
        console.log(result);
      } catch (error) {
        const err = error as Error;
        console.log("there was an error while sending data:" + err.message);
      }
    };

    sendUnsortedArray();
  }, []);
  return (
    <header className="bg-red-600 text-white flex items-center justify-between w-full h-16 px-8 shadow-md">
      {/* Logo and Name */}
      <div className="text-2xl font-bold tracking-wide">
        <span className="text-blue-400">Sort</span>X
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-10">
        <ul className="flex space-x-8">
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer">
            Home
          </li>
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer">
            Randomize
          </li>
        </ul>

        {/* Algorithm Select Menu */}
        <Select
          onValueChange={(value) =>
            setController((prev) => ({
              ...prev,
              url: value,
            }))
          }
          disabled={isSorting}
        >
          <SelectTrigger className="w-[200px] bg-slate-700 text-xl text-white rounded-md py-2 px-4 transition hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <SelectValue placeholder="Algorithms" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white rounded-md shadow-lg">
            <SelectItem
              value="bubble-sort"
              className="px-4 py-2 hover:bg-blue-500 hover:text-white"
            >
              Bubble Sort
            </SelectItem>
            <SelectItem
              value="insertion-sort"
              className="px-4 py-2 hover:bg-blue-500 hover:text-white"
            >
              Insertion Sort
            </SelectItem>
          </SelectContent>
        </Select>
      </nav>

      {/* Sort Button */}
      <Button
        variant="default"
        className="bg-blue-500 hover:bg-blue-600 text-xl text-white px-6 py-2 rounded-md transition-transform transform hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        onClick={() =>
          setController((prev) => ({
            ...prev,
            isSorting: true,
          }))
        }
        disabled={isSorting}
      >
        {isSorting ? "SORTING..." : "SORT"}
      </Button>
    </header>
  );
}

export default Header;
