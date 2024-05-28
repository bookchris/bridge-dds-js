import { Dds, DealPbn, FutureTricks } from "bridge-dds";
import * as Comlink from "comlink";

export class DdsWorker {
  private dds: Dds;

  private async init() {
    if (!this.dds) {
      this.dds = await Dds.fromFactory();
    }
    return this.dds;
  }

  public async SolveBoardPBN(dealPbn: DealPbn): Promise<FutureTricks> {
    const dds = await this.init();
    return dds.SolveBoardPBN(dealPbn);
  }
}

Comlink.expose(new DdsWorker());
