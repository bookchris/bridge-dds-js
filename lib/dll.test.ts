import { expect, test } from "vitest";
import { Dds } from "./dll";
import { Direction, Trump } from "./types";

test.each([
  [
    {
      trump: Trump.Spades,
      first: Direction.North,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "N:QJ6.K652.J85.T98 873.J97.AT764.Q4 K5.T83.KQ9.A7652 AT942.AQ4.32.KJ3",
    },
    { cards: 9 },
  ],
  [
    {
      trump: Trump.NoTrump,
      first: Direction.North,
      currentTrickRank: [3, 8, 10],
      currentTrickSuit: [3, 1, 0],
      remainCards: "S:.4.KQ32.3 Q8.98.A8. AKT..J96. J.QJT7.T.",
    },
    { cards: 5 },
  ],
])("SolveBoardPBN $remainCards", async (dealPbn, futureTricks) => {
  const dds = await Dds.fromFactory();
  expect(dds.SolveBoardPBN(dealPbn)).toMatchObject(futureTricks);
});
