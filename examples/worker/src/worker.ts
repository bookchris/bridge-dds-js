import DdsLoader, {
  Dds,
  DdTableDealPbn,
  DdTableResults,
  DealPbn,
  FutureTricks,
  PlayTracePbn,
  SolvedPlay,
} from "bridge-dds";
import * as Comlink from "comlink";

export class DdsWorker {
  private dds?: Dds;

  private async init() {
    if (!this.dds) {
      const module = await DdsLoader();
      this.dds = new module.Dds();
    }
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
