import {
  DdTableDealPbn,
  DealPbn,
  Direction,
  PlayTracePbn,
  Trump,
} from "bridge-dds";

export const solveBoardPBNExamples: { label: string; dealPbn: DealPbn }[] = [
  {
    label: "random hand",
    dealPbn: {
      trump: Trump.NoTrump,
      first: Direction.North,
      currentTrickRank: [3, 8, 10],
      currentTrickSuit: [3, 1, 0],
      remainCards: "S:.4.KQ32.3 Q8.98.A8. AKT..J96. J.QJT7.T.",
    },
  },
  {
    label: "expensive hand to solve",
    dealPbn: {
      trump: Trump.Spades,
      first: Direction.West,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "S:Q853.AJ962.KT74. AJ962.KT74..Q853 KT74..Q853.AJ962 .Q853.AJ962.KT74",
    },
  },
  {
    label: "solve from trick 1",
    dealPbn: {
      trump: 4,
      first: 1,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "N:AKT74.A65.J96.84 J53.KQJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
  },
  {
    label: "solve from trick 2",
    dealPbn: {
      trump: 4,
      first: 1,
      currentTrickRank: [13],
      currentTrickSuit: [1],
      remainCards:
        "N:AKT74.A65.J96.84 J53.QJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
  },
  {
    label: "solve after dd table",
    dealPbn: {
      trump: 0,
      first: 3,
      currentTrickRank: [],
      currentTrickSuit: [],
      remainCards:
        "S:AKQJT.J62.JT73.Q 753.AKT5.842.A93 942.Q74.KQ9.J652 86.983.A65.KT874",
    },
  },
];

export const analyzePlayPBNExamples: {
  label: string;
  dealPbn: DealPbn;
  playTracePbn: PlayTracePbn;
}[] = [
  {
    label: "random play",
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

export const calcDDTablePBNExamples: {
  label: string;
  ddTableDealPbn: DdTableDealPbn;
}[] = [
  {
    label: "random table",
    ddTableDealPbn: {
      cards:
        "N:AKT74.A65.J96.84 J53.KQJT7.T75.97 .43.KQ32.AKJT653 Q9862.982.A84.Q2",
    },
  },
  {
    label: "table before solve board",
    ddTableDealPbn: {
      cards:
        "S:AKQJT.J62.JT73.Q 753.AKT5.842.A93 942.Q74.KQ9.J652 86.983.A65.KT874",
    },
  },
];
