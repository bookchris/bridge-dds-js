import { Dds, Direction, FutureTricks, Trump } from "bridge-dds";
import * as Comlink from "comlink";
import { useEffect, useMemo, useState } from "react";

function useDdsWorker() {
  return useMemo(() => {
    const worker = new Worker(new URL("./worker", import.meta.url), {
      type: "module",
    });
    return Comlink.wrap<Dds>(worker);
  }, []);
}

function App() {
  const ddsWorker = useDdsWorker();
  const [value, setValue] = useState<FutureTricks>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    ddsWorker
      .SolveBoardPBN({
        trump: Trump.NoTrump,
        first: Direction.North,
        currentTrickRank: [3, 8, 10],
        currentTrickSuit: [3, 1, 0],
        remainCards: "S:.4.KQ32.3 Q8.98.A8. AKT..J96. J.QJT7.T.",
      })
      .then(setValue)
      .catch(setError);
  }, [ddsWorker]);

  return error ? (
    <div>error {JSON.stringify(error)}</div>
  ) : !value ? (
    <div>loading</div>
  ) : (
    <div>solution {JSON.stringify(value)}</div>
  );
}

export default App;
