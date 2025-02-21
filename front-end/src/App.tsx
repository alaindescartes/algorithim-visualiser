import ArrayContextProvider from "./_components/arrayContextProvider";
import Chart from "./_components/Chart";
import Header from "./_components/Header";
import SocketListener from "./_components/SocketListener";
import ControllerContextProvider from "./_components/ControllerProvider";
import { ControllerContext } from "./_components/ControllerProvider";
import { useContext } from "react";

function App() {
  return (
    <ControllerContextProvider>
      <ArrayContextProvider>
        <Header />
        <SocketHandler />
        <main className="p-2 flex flex-col gap-4">
          <div className="mt-64">
            <Chart />
          </div>
        </main>
      </ArrayContextProvider>
    </ControllerContextProvider>
  );
}

function SocketHandler() {
  const { url, isSorting } = useContext(ControllerContext);
  if (isSorting) return url !== "" ? <SocketListener url={url} /> : null;
  else null;
}

export default App;
