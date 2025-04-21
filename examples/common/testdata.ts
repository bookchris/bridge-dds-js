import {
  DdTableDealPbn,
  DealPbn,
  Direction,
  PlayTracePbn,
  Trump,
} from "bridge-dds";

export const solveBoardPBNExamples: { dealPbn: DealPbn }[] = [
  // Random hand.
  {
    dealPbn: {
      trump: Trump.NoTrump,
      first: Direction.North,
      currentTrickRank: [3, 8, 10],
      currentTrickSuit: [3, 1, 0],
      remainCards: "S:.4.KQ32.3 Q8.98.A8. AKT..J96. J.QJT7.T.",
    },
  },
  // Expensive hand to solve.
  {
    dealPbn: {
      trump: Trump.Spades,
      first: Direction.West,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "S:Q853.AJ962.KT74. AJ962.KT74..Q853 KT74..Q853.AJ962 .Q853.AJ962.KT74",
    },
  },
  // Trick 1.
  {
    dealPbn: {
      trump: 4,
      first: 1,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "N:AKT74.A65.J96.84 J53.KQJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
  },
  // Trick 2
  {
    dealPbn: {
      trump: 4,
      first: 1,
      currentTrickRank: [13],
      currentTrickSuit: [1],
      remainCards:
        "N:AKT74.A65.J96.84 J53.QJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
  },
];

export const analyzePlayPBNExamples: {
  dealPbn: DealPbn;
  playTracePbn: PlayTracePbn;
}[] = [
  {
    dealPbn: {
      trump: 4,
      first: 1,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "N:AKT74.A65.J96.84 J53.KQJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
    playTracePbn: {
      cards: "HKH3H2HA",
    },
  },
];

export const calcDDTablePBNExamples: { ddTableDealPbn: DdTableDealPbn }[] = [
  {
    ddTableDealPbn: {
      cards:
        "N:AKT74.A65.J96.84 J53.KQJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
  },
];
