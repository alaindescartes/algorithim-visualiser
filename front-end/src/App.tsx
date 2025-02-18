import Chart from "./_components/Chart";
import Header from "./_components/Header";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://0.0.0.0:8000");

  socket.on("connection", () => {
    console.log("connected: " + socket.id);
  });

  socket.on("connect_error", (error) => {
    if (!socket.active) {
      console.log("could not connect: " + error.message);
    }
  });
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
