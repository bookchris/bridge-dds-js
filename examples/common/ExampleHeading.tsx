import { ReactNode } from "react";

export function ExampleHeading({
  i,
  label,
  children,
}: {
  i: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <p>
      <b>
        #{i + 1}: {label}
      </b>
      {children}
    </p>
  );
}
