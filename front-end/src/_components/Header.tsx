import { JSX } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/Users/alaindescartesuwishema/Desktop/projects/algorithim-visualiser/front-end/src/components/ui/select.tsx";

function Header(): JSX.Element {
  return (
    <header className="bg-red-500 text-white flex flex-row items-center justify-between w-full h-16 p-4 shadow-lg">
      {/* Logo and Name */}
      <div className="text-2xl font-bold">
        <span className="text-blue-400">SortX</span>
      </div>

      {/* Buttons and Links */}
      <nav className="flex space-x-8">
        <ul className="flex space-x-6">
          <li className="hover:text-blue-400 transition duration-300">Home</li>
          <li className="hover:text-blue-400 transition duration-300">
            Randomize
          </li>
        </ul>
        <div className="flex space-x-4">
          {/* Algorithm Select Menu */}
          <Select>
            <SelectTrigger className="w-[180px] bg-gray-700 text-white">
              <SelectValue placeholder="Algorithms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble-sort">Bubble Sort</SelectItem>
              <SelectItem value="insertion-sort">Insertion Sort</SelectItem>
            </SelectContent>
          </Select>

          {/* Another Select Menu (Duplicate for now) */}
          <Select>
            <SelectTrigger className="w-[180px] bg-gray-700 text-white">
              <SelectValue placeholder="More Algorithms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble-sort">Bubble Sort</SelectItem>
              <SelectItem value="insertion-sort">Insertion Sort</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </nav>
    </header>
  );
}

export default Header;
