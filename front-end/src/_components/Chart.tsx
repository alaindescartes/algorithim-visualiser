import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

interface DataItem {
  value: number;
}

interface ChartProps {
  initialData: number[];
}

function Chart({ initialData }: ChartProps) {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const processedData = initialData.map((num) => ({ value: num }));
    setData(processedData);
  }, [initialData]);

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
