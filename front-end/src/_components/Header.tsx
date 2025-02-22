import { JSX, useEffect, useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/Users/alaindescartesuwishema/Desktop/projects/algorithim-visualiser/front-end/src/components/ui/select.tsx";
import { Button } from "@/components/ui/button";
import { ControllerContext } from "./ControllerProvider";
import { sendUnsortedArray } from "@/util/helpers";

function Header(): JSX.Element {
  const { isSorting, size, setController, url } = useContext(ControllerContext);

  useEffect(() => {
    sendUnsortedArray(size);
  }, []);

  function initiateSort() {
    if (url === "") {
      alert("You must select an algorithim first");
      setController((prev) => ({
        ...prev,
        isSorting: false,
      }));
    } else {
      setController((prev) => ({
        ...prev,
        isSorting: true,
      }));
    }
  }

  function increaseSIze() {
    const sizeIncrement = 20;
    if (size >= 100) {
      alert("Maximum size reached");
      setController((prev) => ({ ...prev, size: 100 }));
    } else {
      setController((prev) => ({ ...prev, size: size + sizeIncrement }));
    }
    sendUnsortedArray(size);
  }

  function reduceSize() {
    const sizeIncrement = 20;
    if (size >= 40) {
      setController((prev) => ({ ...prev, size: size - sizeIncrement }));
    } else {
      alert("Minimum size reached");
      setController((prev) => ({ ...prev, size: 20 }));
    }
    sendUnsortedArray(size);
  }

  return (
    <header className="bg-red-600 text-white flex items-center justify-between w-full h-16 px-8 shadow-md">
      {/* Logo and Name */}
      <div className="text-2xl font-bold tracking-wide">
        <span className="text-blue-400">Sort</span>X
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-14">
        <ul className="flex space-x-8">
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer mt-1">
            <span className="text-lg font-medium ">HOME</span>
          </li>
          <li className="flex items-center gap-4 hover:text-blue-400 transition duration-300 cursor-pointer">
            <Button
              onClick={() => reduceSize()}
              className="bg-black text-white border border-black rounded-full text-3xl w-10 h-10 flex items-center justify-center"
            >
              -
            </Button>
            <span className="text-lg font-medium">SIZE</span>
            <Button
              onClick={() => increaseSIze()}
              className="bg-black text-white border border-black rounded-full text-3xl w-10 h-10 flex items-center justify-center"
            >
              +
            </Button>
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
        onClick={() => initiateSort()}
        disabled={isSorting}
      >
        {isSorting ? "SORTING..." : "SORT"}
      </Button>
    </header>
  );
}

export default Header;
