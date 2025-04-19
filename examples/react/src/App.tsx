import {
  Dds,
  DdsModule,
  DdTableDealPbn,
  DealPbn,
  loadDds,
  PlayTracePbn,
} from "bridge-dds";
import { useEffect, useMemo, useState } from "react";
import { ddsErrorMessage } from "../../common/error";
import {
  analyzePlayPBNExamples,
  calcDDTablePBNExamples,
  solveBoardPBNExamples,
} from "../../common/testdata";

function useDds() {
  const [dds, setDds] = useState<Dds>();
  useEffect(() => {
    loadDds().then((module: DdsModule) => setDds(new Dds(module)));
  }, []);
  return dds;
}

function CalcDDTablePBNExample({
  deal,
  dds,
}: {
  deal: DdTableDealPbn;
  dds: Dds;
}) {
  const [value, error] = useMemo(() => {
    try {
      const value = dds.CalcDDTablePBN(deal);
      return [value, undefined];
    } catch (e: unknown) {
      return [undefined, e];
    }
  }, []);

  return error ? (
    <div>error: {ddsErrorMessage(error)}</div>
  ) : (
    <div>tricks {JSON.stringify(value)}</div>
  );
}

function SolveBoardPBNExample({ deal, dds }: { deal: DealPbn; dds: Dds }) {
  const [value, error] = useMemo(() => {
    try {
      const value = dds.SolveBoardPBN(deal, -1, 3, 2);
      return [value, undefined];
    } catch (e: unknown) {
      return [undefined, e];
    }
  }, []);

  return error ? (
    <div>error: {ddsErrorMessage(error)}</div>
  ) : (
    <div>tricks {JSON.stringify(value)}</div>
  );
}

function AnalyzePlayPBNExample({
  deal,
  play,
  dds,
}: {
  deal: DealPbn;
  play: PlayTracePbn;
  dds: Dds;
}) {
  const [value, error] = useMemo(() => {
    try {
      const value = dds.AnalysePlayPBN(deal, play);
      return [value, undefined];
    } catch (e: unknown) {
      return [undefined, e];
    }
  }, []);

  return error ? (
    <div>error: {ddsErrorMessage(error)}</div>
  ) : (
    <div>tricks {JSON.stringify(value)}</div>
  );
}

function App() {
  const dds = useDds();
  if (!dds) {
    return <div>Loading dds</div>;
  }
  return (
    <div>
      <h1>AnalyzePlayPBN examples</h1>
      <ul>
        {analyzePlayPBNExamples.map(({ deal, play }, i) => (
          <li key={i}>
            <AnalyzePlayPBNExample deal={deal} play={play} dds={dds} />
          </li>
        ))}
      </ul>
      <h1>CalcDDTablePBN examples</h1>
      <ul>
        {calcDDTablePBNExamples.map((deal, i) => (
          <li key={i}>
            <CalcDDTablePBNExample deal={deal} dds={dds} />
          </li>
        ))}
      </ul>
      <h1>SolveBoardPBN examples</h1>
      <ul>
        {solveBoardPBNExamples.map((deal, i) => (
          <li key={i}>
            <SolveBoardPBNExample deal={deal} dds={dds} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
