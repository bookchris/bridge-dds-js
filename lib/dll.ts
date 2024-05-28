import factory from "./out.js";

/// <reference types="emscripten" />

/// Extending Module
// This requires -s "EXTRA_EXPORTED_RUNTIME_METHODS=['cwrap','ccall','getValue','setvalue']"
// in emcc compilation flags
interface MyEmscriptenModule extends EmscriptenModule {
  cwrap: typeof cwrap;
  ccall: typeof ccall;
  getValue: typeof getValue;
  setValue: typeof setValue;
  stringToUTF8: typeof stringToUTF8;
}

const sizeOfInt = 4;
const sizeOfIntArray = (len: number) => len * sizeOfInt;

export interface DealPbn {
  trump: number;
  first: number;
  currentTrickSuit: number[];
  currentTrickRank: number[];
  remainCards: string;
}

/*
struct dealPBN
{
  int trump;
  int first;
  int currentTrickSuit[3];
  int currentTrickRank[3];
  char remainCards[80];
};
*/
const dealPbnTrumpOffset = 0;
const dealPbnFirstOffset = dealPbnTrumpOffset + sizeOfInt;
const dealPbnCurrentTrickSuitOffset = dealPbnFirstOffset + sizeOfInt;
const dealPbnCurrentTrickRankOffset =
  dealPbnCurrentTrickSuitOffset + sizeOfIntArray(3);
const dealPbnRemainCardsOffset =
  dealPbnCurrentTrickRankOffset + sizeOfIntArray(3);
const dealPbnSize = dealPbnRemainCardsOffset + 80;

export interface FutureTricks {
  nodes: number;
  cards: number;
  suit: number[];
  rank: number[];
  equals: number[];
  score: number[];
}

/*
struct futureTricks
{
  int nodes;
  int cards;
  int suit[13];
  int rank[13];
  int equals[13];
  int score[13];
};
*/
const futureTricksNodesOffset = 0;
const futureTricksCardsOffset = futureTricksNodesOffset + sizeOfInt;
const futureTricksSuitOffset = futureTricksCardsOffset + sizeOfInt;
const futureTricksRankOffset = futureTricksSuitOffset + sizeOfIntArray(13);
const futureTricksEqualsOffset = futureTricksRankOffset + sizeOfIntArray(13);
const futureTricksScoreOffset = futureTricksEqualsOffset + sizeOfIntArray(13);
const futureTricksSize = futureTricksScoreOffset + sizeOfIntArray(13);

export class DdsError extends Error {
  constructor(public code: number) {
    super("DDS API error: " + code);
  }
}

export class Dds {
  constructor(private module: MyEmscriptenModule) {
    this.module.ccall("SetMaxThreads", null, ["number"], [0]);
  }

  public static async fromFactory() {
    var Module: MyEmscriptenModule = await factory();

    return new Dds(Module);
  }

  public SolveBoardPBN(dealPbn: DealPbn): FutureTricks {
    const Module = this.module;
    const dealpbn = Module._malloc(dealPbnSize);
    const futp = Module._malloc(futureTricksSize);

    try {
      Module.setValue(dealpbn + dealPbnTrumpOffset, dealPbn.trump, "i32");
      Module.setValue(dealpbn + dealPbnFirstOffset, dealPbn.first, "i32");
      for (let i = 0; i < 3; i++) {
        Module.setValue(
          dealpbn + dealPbnCurrentTrickSuitOffset + sizeOfInt * i,
          dealPbn.currentTrickSuit[i],
          "i32"
        );
        Module.setValue(
          dealpbn + dealPbnCurrentTrickRankOffset + sizeOfInt * i,
          dealPbn.currentTrickRank[i],
          "i32"
        );
      }
      Module.stringToUTF8(
        dealPbn.remainCards,
        dealpbn + dealPbnRemainCardsOffset,
        80
      );

      const result = Module.ccall(
        "SolveBoardPBN",
        "number",
        [
          "number", // dealpbn
          "number", // target
          "number", // solutions
          "number", // mode
          "number", // futp
          "number", // thrId
        ],
        [dealpbn, -1, 3, 0, futp, 0]
      );
      if (result != 1) {
        throw new DdsError(result);
      }
      const futureTricks: FutureTricks = {
        nodes: Module.getValue(futp + futureTricksNodesOffset, "i32"),
        cards: Module.getValue(futp + futureTricksCardsOffset, "i32"),
        suit: [],
        rank: [],
        equals: [],
        score: [],
      };
      for (let i = 0; i < futureTricks.cards; i++) {
        futureTricks.suit.push(
          Module.getValue(futp + futureTricksSuitOffset + sizeOfInt * i, "i32")
        );
        futureTricks.rank.push(
          Module.getValue(futp + futureTricksRankOffset + sizeOfInt * i, "i32")
        );
        futureTricks.equals.push(
          Module.getValue(
            futp + futureTricksEqualsOffset + sizeOfInt * i,
            "i32"
          )
        );
        futureTricks.score.push(
          Module.getValue(futp + futureTricksScoreOffset + sizeOfInt * i, "i32")
        );
      }
      return futureTricks;
    } finally {
      Module._free(dealpbn);
      Module._free(futp);
    }
  }
}
