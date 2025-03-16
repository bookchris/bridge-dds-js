const sizeOfInt = 4;
const sizeOfIntArray = (len) => len * sizeOfInt;

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

export class Dds {
  constructor() {
    ccall("SetMaxThreads", null, ["number"], [0]);
  }

  SolveBoardPBN(dealPbn) {
    const dealpbn = _malloc(dealPbnSize);
    const futp = _malloc(futureTricksSize);

    try {
      setValue(dealpbn + dealPbnTrumpOffset, dealPbn.trump, "i32");
      setValue(dealpbn + dealPbnFirstOffset, dealPbn.first, "i32");
      for (let i = 0; i < 3; i++) {
        setValue(
          dealpbn + dealPbnCurrentTrickSuitOffset + sizeOfInt * i,
          dealPbn.currentTrickSuit[i],
          "i32"
        );
        setValue(
          dealpbn + dealPbnCurrentTrickRankOffset + sizeOfInt * i,
          dealPbn.currentTrickRank[i],
          "i32"
        );
      }
      stringToUTF8(dealPbn.remainCards, dealpbn + dealPbnRemainCardsOffset, 80);

      const result = ccall(
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
      const futureTricks = {
        nodes: getValue(futp + futureTricksNodesOffset, "i32"),
        cards: getValue(futp + futureTricksCardsOffset, "i32"),
        suit: [],
        rank: [],
        equals: [],
        score: [],
      };
      for (let i = 0; i < futureTricks.cards; i++) {
        futureTricks.suit.push(
          getValue(futp + futureTricksSuitOffset + sizeOfInt * i, "i32")
        );
        futureTricks.rank.push(
          getValue(futp + futureTricksRankOffset + sizeOfInt * i, "i32")
        );
        futureTricks.equals.push(
          getValue(futp + futureTricksEqualsOffset + sizeOfInt * i, "i32")
        );
        futureTricks.score.push(
          getValue(futp + futureTricksScoreOffset + sizeOfInt * i, "i32")
        );
      }
      return futureTricks;
    } finally {
      _free(dealpbn);
      _free(futp);
    }
  }
}

export class DdsError extends Error {
  constructor(code) {
    super("DDS API error: " + code);
  }
}
