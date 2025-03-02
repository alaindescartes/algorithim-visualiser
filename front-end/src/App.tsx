import ArrayContextProvider from "./_components/ArrayContextProvider";
import Chart from "./_components/Chart";
import Header from "./_components/Header";
import SocketListener from "./_components/SocketListener";
import ControllerContextProvider from "./_components/ControllerProvider";
import { ControllerContext } from "./_components/ControllerProvider";
import { useContext } from "react";
import { generateRandomNumbers } from "./util/helpers";

function App() {
  return (
    <ControllerContextProvider>
      <ArrayContextProvider>
        <Header />
        <SocketHandler />
        <main className="p-2 flex flex-col gap-4 ">
          <div className="flex flex-row space-x-10 justify-around">
            <GetTitle />
            <GetSize />
          </div>
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

function GetTitle() {
  const { url } = useContext(ControllerContext);
  return url !== "" ? (
    <h1 className="text-center pt-6 font-bold text-2xl underline">{url}</h1>
  ) : null;
}

function GetSize() {
  const { size } = useContext(ControllerContext);
  return (
    <span className="text-center pt-6 font-bold text-2xl underline">
      Size:{size}
    </span>
  );
}

export default App;
