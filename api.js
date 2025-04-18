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

/*
struct playTracePBN
{
  int number;
  char cards[106];
};
*/
const playTracePbnNumberOffset = 0;
const playTracePbnCardsOffset = playTracePbnNumberOffset + sizeOfInt;
const playTracePbnSize = playTracePbnCardsOffset + 106;

/*
struct solvedPlay
{
  int number;
  int tricks[53];
};
*/
const solvedPlayNumberOffset = 0;
const solvedPlayTricksOffset = solvedPlayNumberOffset + sizeOfInt;
const solvedPlaySize = solvedPlayTricksOffset + sizeOfIntArray(53);

/*
struct ddTableDealPBN
{
  char cards[80];
};
*/
const ddTableDealPbnCardsOffset = 0;
const ddTableDealPbnSize = ddTableDealPbnCardsOffset + 80;

/*
struct ddTableResults
{
  int resTable[DDS_STRAINS][DDS_HANDS];
};
*/
const ddTableResultsResTableOffset = 0;
const ddTableResultsSize = ddTableResultsResTableOffset + sizeOfIntArray(5 * 4);

const ddsNumStrains = 5;
const ddsNumSeats = 4;

class Dds {
  constructor() {
    ccall("SetMaxThreads", null, ["number"], [0]);
  }

  CalcDDTablePBN(ddTableDealPbn) {
    const ddTableDealPbnPtr = _malloc(ddTableDealPbnSize);
    const ddTableResultsPtr = _malloc(ddTableResultsSize);

    try {
      ddTableDealPbnToPointer(ddTableDealPbn, ddTableDealPbnPtr);

      const result = ccall(
        "CalcDDtablePBN",
        "number",
        [
          "number", // ddTableDealPbnPtr
          "number", // ddTableResultsPtr
        ],
        [ddTableDealPbnPtr, ddTableResultsPtr]
      );
      if (result != 1) {
        throw new DdsError(result);
      }
      const ddTableResults = {
        resTable: [...Array(ddsNumStrains).keys()].map((strain) =>
          [...Array(ddsNumSeats).keys()].map((hand) =>
            getValue(
              ddTableResultsPtr +
                ddTableResultsResTableOffset +
                sizeOfIntArray(strain * ddsNumSeats + hand),
              "i32"
            )
          )
        ),
      };
      return ddTableResults;
    } finally {
      _free(ddTableDealPbnPtr);
      _free(ddTableResultsPtr);
    }
  }

  SolveBoardPBN(dealPbn, target, solutions, mode) {
    const dealPbnPtr = _malloc(dealPbnSize);
    const futp = _malloc(futureTricksSize);

    try {
      dealPbnToPointer(dealPbn, dealPbnPtr);

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
        [dealPbnPtr, target, solutions, mode, futp, 0]
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
      _free(dealPbnPtr);
      _free(futp);
    }
  }

  AnalysePlayPBN(dealPbn, playPbn) {
    const dealPbnPtr = _malloc(dealPbnSize);
    const playPbnPtr = _malloc(playTracePbnSize);
    const solvedPlayPtr = _malloc(solvedPlaySize);

    try {
      dealPbnToPointer(dealPbn, dealPbnPtr);
      playPbnToPointer(playPbn, playPbnPtr);

      const result = ccall(
        "AnalysePlayPBN",
        "number",
        [
          "number", // dealPbnPtr
          "number", // playPbnPtr
          "number", // solvedPlayPtr
          "number", // thrId
        ],
        [dealPbnPtr, playPbnPtr, solvedPlayPtr, 0]
      );
      if (result != 1) {
        throw new DdsError(result);
      }
      const number = getValue(solvedPlayPtr + solvedPlayNumberOffset, "i32");
      const solvedPlay = { tricks: [] };
      for (let i = 0; i < number; i++) {
        solvedPlay.tricks.push(
          getValue(
            solvedPlayPtr + solvedPlayTricksOffset + sizeOfInt * i,
            "i32"
          )
        );
      }
      return solvedPlay;
    } finally {
      _free(dealPbnPtr);
      _free(playPbnPtr);
      _free(solvedPlayPtr);
    }
  }
}

class DdsError extends Error {
  constructor(code) {
    super("DDS API error: " + code);
  }
}

Module.Dds = Dds;

function dealPbnToPointer(dealPbn, dealPbnPtr) {
  setValue(dealPbnPtr + dealPbnTrumpOffset, dealPbn.trump, "i32");
  setValue(dealPbnPtr + dealPbnFirstOffset, dealPbn.first, "i32");
  for (let i = 0; i < 3; i++) {
    setValue(
      dealPbnPtr + dealPbnCurrentTrickSuitOffset + sizeOfInt * i,
      dealPbn.currentTrickSuit[i] || 0,
      "i32"
    );
    setValue(
      dealPbnPtr + dealPbnCurrentTrickRankOffset + sizeOfInt * i,
      dealPbn.currentTrickRank[i] || 0,
      "i32"
    );
  }
  stringToUTF8(dealPbn.remainCards, dealPbnPtr + dealPbnRemainCardsOffset, 80);
}

function playPbnToPointer(playPbn, playPbnPtr) {
  setValue(
    playPbnPtr + playTracePbnNumberOffset,
    playPbn.cards.length / 2,
    "i32"
  );
  stringToUTF8(playPbn.cards, playPbnPtr + playTracePbnCardsOffset, 106);
}

function ddTableDealPbnToPointer(ddTableDealPbn, ddTableDealPbnPtr) {
  stringToUTF8(
    ddTableDealPbn.cards,
    ddTableDealPbnPtr + ddTableDealPbnCardsOffset,
    80
  );
}
