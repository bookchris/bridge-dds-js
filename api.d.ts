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
export interface FutureTricks {
    nodes: number;
    cards: number;
    suit: number[];
    rank: number[];
    equals: number[];
    score: number[];
}
export declare class Dds {
    constructor();
    SolveBoardPBN(dealPbn: DealPbn): FutureTricks;
}
declare const createModule: EmscriptenModuleFactory<DdsModule>;
export default createModule;
//# sourceMappingURL=api.d.ts.map