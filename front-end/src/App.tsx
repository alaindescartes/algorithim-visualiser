import ArrayContextProvider from "./_components/arrayContextProvider";
import Chart from "./_components/Chart";
import Header from "./_components/Header";
import SocketListener from "./_components/SocketListener";

function App() {
  return (
    <ArrayContextProvider>
      <Header />
      <SocketListener url="bubble-sort" />
      <main className="p-2 flex flex-col gap-4">
        <div className="mt-64">
          <Chart />
        </div>
      </main>
    </ArrayContextProvider>
  );
}

export default App;
