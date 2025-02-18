import Chart from "./_components/Chart";
import Header from "./_components/Header";

function App() {
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
