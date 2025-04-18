import {
  Dds,
  DdTableDealPbn,
  DdTableResults,
  DealPbn,
  FutureTricks,
  PlayTracePbn,
  SolvedPlay,
} from "bridge-dds";
import * as Comlink from "comlink";
import { useEffect, useMemo, useState } from "react";
import { ddsErrorMessage } from "../../common/error";
import {
  analyzePlayPBNExamples,
  calcDDTablePBNExamples,
  solveBoardPBNExamples,
} from "../../common/testdata";

function useDdsWorker() {
  return useMemo(() => {
    const worker = new Worker(new URL("./worker", import.meta.url), {
      type: "module",
    });
    return Comlink.wrap<Dds>(worker);
  }, []);
}

function CalcDDTablePBNExample({
  deal,
  dds,
}: {
  deal: DdTableDealPbn;
  dds: Comlink.Remote<Dds>;
}) {
  const [value, setValue] = useState<DdTableResults>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    dds.CalcDDTablePBN(deal).then(setValue).catch(setError);
  }, []);

  return error ? (
    <div>error: {ddsErrorMessage(error)}</div>
  ) : !value ? (
    <div>loading</div>
  ) : (
    <div>solution {JSON.stringify(value)}</div>
  );
}

function SolveBoardPBNExample({
  deal,
  dds,
}: {
  deal: DealPbn;
  dds: Comlink.Remote<Dds>;
}) {
  const [value, setValue] = useState<FutureTricks>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    dds.SolveBoardPBN(deal, -1, 3, 2).then(setValue).catch(setError);
  }, []);

  return error ? (
    <div>error: {ddsErrorMessage(error)}</div>
  ) : !value ? (
    <div>loading</div>
  ) : (
    <div>solution {JSON.stringify(value)}</div>
  );
}

function AnalyzePlayPBNExample({
  deal,
  play,
  dds,
}: {
  deal: DealPbn;
  play: PlayTracePbn;
  dds: Comlink.Remote<Dds>;
}) {
  const [value, setValue] = useState<SolvedPlay>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    dds.AnalysePlayPBN(deal, play).then(setValue).catch(setError);
  }, []);

  return error ? (
    <div>error: {ddsErrorMessage(error)}</div>
  ) : !value ? (
    <div>loading</div>
  ) : (
    <div>solution {JSON.stringify(value)}</div>
  );
}

function App() {
  const dds = useDdsWorker();
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
