import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("Connect to NATS...");
        resolve();
      });
      this._client!.on("error", () => {
        reject();
      });
    });
  }
}

export const natWrapper = new NatsWrapper();
