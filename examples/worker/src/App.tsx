import {
  Dds,
  DdTableDealPbn,
  DealPbn,
  Direction,
  PlayTracePbn,
  Vulnerable,
} from "bridge-dds";
import * as Comlink from "comlink";
import { useEffect, useMemo, useState } from "react";
import { ExampleHeading } from "../../common/ExampleHeading";
import { ExampleOutput } from "../../common/ExampleOutput";
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

function useAsyncApi<T>(func: () => Promise<T>): {
  output?: T;
  error?: unknown;
} {
  const [output, setOutput] = useState<T>();
  const [error, setError] = useState<unknown>();
  useEffect(() => {
    func().then(setOutput).catch(setError);
  }, []);
  return { output, error };
}

function CalcDDTablePBNExample({
  ddTableDealPbn,
  dds,
}: {
  ddTableDealPbn: DdTableDealPbn;
  dds: Comlink.Remote<Dds>;
}) {
  const { output, error } = useAsyncApi(async () => {
    const ddTableResults = await dds.CalcDDTablePBN(ddTableDealPbn);
    const parResultsDealer = await dds.DealerPar(
      ddTableResults,
      Direction.North,
      Vulnerable.EastWest
    );
    return { ddTableResults, parResultsDealer };
  });
  return (
    <ExampleOutput input={{ ddTableDealPbn }} output={output} error={error} />
  );
}

function SolveBoardPBNExample({
  dealPbn,
  dds,
}: {
  dealPbn: DealPbn;
  dds: Comlink.Remote<Dds>;
}) {
  const { output, error } = useAsyncApi(() =>
    dds.SolveBoardPBN(dealPbn, -1, 3, 2)
  );
  return <ExampleOutput input={{ dealPbn }} output={output} error={error} />;
}

function AnalyzePlayPBNExample({
  dealPbn,
  playTracePbn,
  dds,
}: {
  dealPbn: DealPbn;
  playTracePbn: PlayTracePbn;
  dds: Comlink.Remote<Dds>;
}) {
  const { output, error } = useAsyncApi(() =>
    dds.AnalysePlayPBN(dealPbn, playTracePbn)
  );
  return (
    <ExampleOutput
      input={{ dealPbn, playTracePbn }}
      output={output}
      error={error}
    />
  );
}

function App() {
  const dds = useDdsWorker();
  return (
    <div>
      <h1>AnalyzePlayPBN examples</h1>
      {analyzePlayPBNExamples.map((inputs, i) => (
        <ExampleHeading key={i} i={i}>
          <AnalyzePlayPBNExample {...inputs} dds={dds} />
        </ExampleHeading>
      ))}
      <h1>CalcDDTablePBN / ParDealer examples</h1>
      {calcDDTablePBNExamples.map((inputs, i) => (
        <ExampleHeading key={i} i={i}>
          <CalcDDTablePBNExample {...inputs} dds={dds} />
        </ExampleHeading>
      ))}
      <h1>SolveBoardPBN examples</h1>
      {solveBoardPBNExamples.map((inputs, i) => (
        <ExampleHeading key={i} i={i}>
          <SolveBoardPBNExample {...inputs} dds={dds} />
        </ExampleHeading>
      ))}
    </div>
  );
}

export default App;
