import { ddsErrorMessage } from "./error";

export function ExampleOutput({
  input,
  output,
  error,
}: {
  input: Object;
  output?: Object;
  error?: unknown;
}) {
  return (
    <>
      <li>input: {JSON.stringify(input)}</li>
      {!!error ? (
        <li>error: {ddsErrorMessage(error)}</li>
      ) : !!output ? (
        <li>output: {JSON.stringify(output)}</li>
      ) : (
        <li>loading...</li>
      )}
    </>
  );
}
