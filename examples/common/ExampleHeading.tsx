import { ReactNode } from "react";

export function ExampleHeading({
  i,
  children,
}: {
  i: number;
  children: ReactNode;
}) {
  return (
    <p>
      #{i + 1}
      {children}
    </p>
  );
}
