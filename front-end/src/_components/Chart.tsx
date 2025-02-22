import { useState, useEffect, useContext, useMemo } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { ArrayContext } from "./ArrayContextProvider";
import { ControllerContext } from "./ControllerProvider";
import { generateRandomNumbers } from "@/util/helpers";

interface DataItem {
  value: number;
}

function Chart() {
  const { array } = useContext(ArrayContext);
  const { size } = useContext(ControllerContext);

  // Generate a new array when `size` changes
  const initialArr = useMemo(() => generateRandomNumbers(size), [size]);

  // State for the chart data
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    // If `array` is empty, update with new initial array when `size` changes
    if (array.length === 0) {
      setData(initialArr.map((num) => ({ value: num })));
    }
  }, [size, initialArr, array]); // ✅ Now listens for `size` changes

  useEffect(() => {
    if (array.length > 0) {
      setData(array.map((num) => ({ value: num })));
    }
  }, [array]); // ✅ Updates when `array` changes

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="value" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
