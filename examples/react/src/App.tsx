import {
  Dds,
  DdsModule,
  DdTableDealPbn,
  DealPbn,
  Direction,
  loadDds,
  PlayTracePbn,
  Vulnerable,
} from "bridge-dds";
import { useEffect, useMemo, useState } from "react";
import { ExampleHeading } from "../../common/ExampleHeading";
import { ExampleOutput } from "../../common/ExampleOutput";
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

function useSyncApi<T>(func: () => T): { output?: T; error?: unknown } {
  const [output, error] = useMemo(() => {
    try {
      const value = func();
      return [value, undefined];
    } catch (e: unknown) {
      return [undefined, e];
    }
  }, []);
  return { output, error };
}

function CalcDDTablePBNExample({
  ddTableDealPbn,
  dds,
}: {
  ddTableDealPbn: DdTableDealPbn;
  dds: Dds;
}) {
  const { output, error } = useSyncApi(() => {
    const ddTableResults = dds.CalcDDTablePBN(ddTableDealPbn);
    const parResultsDealer = dds.DealerPar(
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
  dds: Dds;
}) {
  const { output, error } = useSyncApi(() =>
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
  dds: Dds;
}) {
  const { output, error } = useSyncApi(() =>
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
  const dds = useDds();
  if (!dds) {
    return <div>Loading dds</div>;
  }
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
