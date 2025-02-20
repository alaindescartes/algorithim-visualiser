import Chart from "./_components/Chart";
import Header from "./_components/Header";
import { useEffect } from "react";
import { socket } from "./util/socket";

function App() {
  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send("Hello from the browser!");
    };

    socket.onmessage = (event) => {
      console.log("Server says:", event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="p-2 flex flex-col gap-4">
        <div></div>
        <div className="mt-64">
          <Chart initialData={[1, 2, 3, 3]} />
        </div>
      </main>
    </>
  );
}

export default App;
