import { useCounterStore } from "@/states/useCounterStore";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={increment}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs font-bold">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
