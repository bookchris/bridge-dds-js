import DdsLoader, { Dds, DealPbn, Direction, Trump } from "bridge-dds";
import { useEffect, useMemo, useState } from "react";

function useDds() {
  const [dds, setDds] = useState<Dds>();
  useEffect(() => {
    DdsLoader().then((module) => setDds(new module.Dds()));
  }, []);
  return dds;
}

function Deal({ deal, dds }: { deal: DealPbn; dds: Dds }) {
  const [value, error] = useMemo(() => {
    try {
      const value = dds.SolveBoardPBN(deal, -1, 3, 2);
      return [value, undefined];
    } catch (e: unknown) {
      return [undefined, e];
    }
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
    // got {
    // "nodes":105,
    // "cards":10,
    // "suit":[1,1,2,2,2,3,3,0,0,0],
    // "rank":[13,7,5,7,10,7,9,3,5,11],
    // "equals":[7168,0,0,0,0,0,0,0,0,0],
    // "score":[3,3,1,1,1,1,1,1,1,1]}
    //
    // Trick 2
    {
      trump: 4,
      first: 1,
      currentTrickRank: [13],
      currentTrickSuit: [1],
      remainCards:
        "N:AKT74.A65.J96.84 J53.QJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
      // got {
      // "nodes":105,
      // "cards":10,
      // "suit":[1,1,2,2,2,3,3,0,0,0],
      // "rank":[13,7,5,7,10,7,9,3,5,11],
      // "equals":[7168,0,0,0,0,0,0,0,0,0],
      // "score":[3,3,1,1,1,1,1,1,1,1]}
    },
  ];

  const dds = useDds();
  if (!dds) {
    return <div>Loading dds</div>;
  }
  return (
    <div>
      <h1>examples</h1>
      <ul>
        {deals.map((deal, i) => (
          <li key={i}>
            <Deal deal={deal} dds={dds} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
