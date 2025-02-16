import { useState, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

function Chart() {
  // Initial array of random numbers between 10 and 100
  const [data, setData] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 910) + 100,
    }))
  );

  useEffect(() => {
    bubbleSort([...data]);
  }, []);

  // Bubble Sort with a delay to visualize each step
  const bubbleSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].value > arr[j + 1].value) {
          // Swap the values
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          // Update the state with a delay for animation
          setData([...arr]);
          await sleep(300); // Adjust delay to control the speed
        }
      }
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
