import { expect, test } from "vitest";
import { SolveBoardPBN } from "./dll";

enum Trump {
  Spades = 0,
  Hearts = 1,
  Diamonds = 2,
  Clubs = 3,
  NoTrump = 4,
}

enum Direction {
  North = 0,
  East = 1,
  South = 2,
  West = 3,
}

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
  expect(await SolveBoardPBN(dealPbn)).toMatchObject(futureTricks);
});

/*
function rank_to_dds(rank: string): number {
  switch (rank) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return Number(rank);
  }
}

function suit_to_dds(suit: string): number {
  const suits = ["S", "H", "D", "C", "N"];
  return suits.indexOf(suit);
}
*/
