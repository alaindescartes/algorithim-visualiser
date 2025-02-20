import { useState, useEffect, useContext } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { ArrayContext } from "./arrayContextProvider";

interface DataItem {
  value: number;
}

function Chart() {
  const [data, setData] = useState<DataItem[]>([]);
  const { array } = useContext(ArrayContext);

  useEffect(() => {
    const processedData = array.map((num) => ({ value: num }));
    setData(processedData);
  }, [array]);

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
