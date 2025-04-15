/// <reference types="emscripten" />
export interface DdsModule extends EmscriptenModule {
  Dds: {
    new (): Dds;
  };
}
declare global {
  const Module: DdsModule;
  const _malloc: typeof Module._malloc;
  const _free: typeof Module._free;
}

export interface DealPbn {
  trump: number;
  first: number;
  currentTrickSuit: number[];
  currentTrickRank: number[];
  remainCards: string;
}

export interface PlayTracePbn {
  cards: string;
}

export interface FutureTricks {
  nodes: number;
  cards: number;
  suit: number[];
  rank: number[];
  equals: number[];
  score: number[];
}

export interface SolvedPlay {
  tricks: number[];
}

export declare class Dds {
  constructor();

  SolveBoardPBN(
    dealPbn: DealPbn,
    target: number,
    solutions: number,
    mode: number
  ): FutureTricks;

  AnalysePlayPBN(dealPbn: DealPbn, playTracePbn: PlayTracePbn): SolvedPlay;
}
declare const createModule: EmscriptenModuleFactory<DdsModule>;
export default createModule;

export declare const Trump: {
  Spades: 0;
  Hearts: 1;
  Diamonds: 2;
  Clubs: 3;
  NoTrump: 4;
};

export declare const Direction: {
  North: 0;
  East: 1;
  South: 2;
  West: 3;
};
