import {
  Dds,
  DdTableDealPbn,
  DdTableResults,
  DealPbn,
  FutureTricks,
  loadDds,
  ParResultsDealer,
  PlayTracePbn,
  SolvedPlay,
} from "bridge-dds";
import * as Comlink from "comlink";

export class DdsWorker {
  private dds?: Dds;
  private initPromise?: Promise<Dds>;

  private async init() {
    if (this.dds) {
      return this.dds;
    }
    if (this.initPromise) {
      return await this.initPromise;
    }
    this.initPromise = loadDds().then((module) => new Dds(module));
    this.dds = await this.initPromise;
    return this.dds;
  }

  public async AnalysePlayPBN(
    dealPbn: DealPbn,
    playTracePbn: PlayTracePbn
  ): Promise<SolvedPlay> {
    const dds = await this.init();
    return dds.AnalysePlayPBN(dealPbn, playTracePbn);
  }

  public async CalcDDTablePBN(
    ddTableDealPbn: DdTableDealPbn
  ): Promise<DdTableResults> {
    const dds = await this.init();
    return dds.CalcDDTablePBN(ddTableDealPbn);
  }

  public async DealerPar(
    ddTableResults: DdTableResults,
    dealer: number,
    vulnerable: number
  ): Promise<ParResultsDealer> {
    const dds = await this.init();
    return dds.DealerPar(ddTableResults, dealer, vulnerable);
  }

  public async SolveBoardPBN(
    dealPbn: DealPbn,
    target: number,
    solutions: number,
    mode: number
  ): Promise<FutureTricks> {
    const dds = await this.init();
    return dds.SolveBoardPBN(dealPbn, target, solutions, mode);
  }
}

Comlink.expose(new DdsWorker());
