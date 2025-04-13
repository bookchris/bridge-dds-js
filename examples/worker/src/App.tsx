import { Dds, DealPbn, Direction, FutureTricks, Trump } from "bridge-dds";
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

function Deal({
  deal,
  worker,
}: {
  deal: DealPbn;
  worker: Comlink.Remote<Dds>;
}) {
  const [value, setValue] = useState<FutureTricks>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    worker.SolveBoardPBN(deal, -1, 3, 2).then(setValue).catch(setError);
  }, []);

  return error ? (
    <div>error {JSON.stringify(error)}</div>
  ) : !value ? (
    <div>loading</div>
  ) : (
    <div>solution {JSON.stringify(value)}</div>
  );
}

function App() {
  const deals: DealPbn[] = [
    // Random hand.
    {
      trump: Trump.NoTrump,
      first: Direction.North,
      currentTrickRank: [3, 8, 10],
      currentTrickSuit: [3, 1, 0],
      remainCards: "S:.4.KQ32.3 Q8.98.A8. AKT..J96. J.QJT7.T.",
    },
    // Expensive hand to solve.
    {
      trump: Trump.Spades,
      first: Direction.West,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "S:Q853.AJ962.KT74. AJ962.KT74..Q853 KT74..Q853.AJ962 .Q853.AJ962.KT74",
    },
    // Trick 1.
    {
      trump: 4,
      first: 1,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "N:AKT74.A65.J96.84 J53.KQJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
    // Trick 2.
    {
      trump: 4,
      first: 1,
      currentTrickRank: [13],
      currentTrickSuit: [1],
      remainCards:
        "N:AKT74.A65.J96.84 J53.QJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
  ];

  const worker = useDdsWorker();
  return (
    <div>
      <h1>examples</h1>
      <ul>
        {deals.map((deal, i) => (
          <li key={i}>
            <Deal deal={deal} worker={worker} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
