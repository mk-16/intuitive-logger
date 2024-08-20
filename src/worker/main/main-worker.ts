import { Log } from "../../utils/log/log.js";

export class LoggerWorker {
    static #buffer: Log[] = [];
    static #worker: any;
    static {
        try {
            if (window !== undefined)
                import("../client/web-worker.js").then(({ url }) => {
                    this.#worker = new Worker(new URL(url), { 'name': "intuitive-logger-web-worker" });
                    for (const log of this.#buffer) {
                        try {
                            this.#worker.postMessage(log);
                        } catch (e) {
                            this.#worker.postLog(JSON.parse(JSON.stringify(log)));
                        }
                    }
                })
            else
                throw new Error("no window")
        }
        catch (e) {
            console.log("IN SERVER")
            import("worker_threads").then(({ Worker }) => {
                import("../server/worker-thread.js").then(({ url }) => {
                    // this.#worker = new Worker(new URL(url), { "name": "worker-thread" });
                    // for (const log of this.#buffer) {
                    //     this.#worker.postMessage(log);
                    // }
                })
            })
        }
    }
    static on() { }
    static postLog(log: Log) {
        if (this.#worker !== undefined) {
            try {
                this.#worker.postMessage(log);
            } catch (e) {
                this.#worker.postLog(JSON.parse(JSON.stringify(log)));
            }
            return;
        }
        this.#buffer.push(log)
    }
}