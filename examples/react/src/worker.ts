import DdsLoader, { Dds, DealPbn, FutureTricks } from "bridge-dds";
import * as Comlink from "comlink";

export class DdsWorker {
  private dds?: Dds;

  private async init() {
    if (!this.dds) {
      const module = await DdsLoader();
      //const module = await import("bridge-dds");
      this.dds = new module.Dds();
    }
    return this.dds;
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
