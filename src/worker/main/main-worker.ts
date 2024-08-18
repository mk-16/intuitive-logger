import { Log } from "../../utils/log/log.js";

export class LoggerWorker {
    static #buffer = new Set<Log>();
    static #worker: any;
    static {
        try {
            window;
            console.log("logging window?", window)
            import("./../client/web-worker.js").then(({ url }) => {
                this.#worker = new Worker(new URL(url), { 'name': "intuitive-logger-web-worker", "type": "module" });
                for (const log of this.#buffer) {
                    this.#worker.postMessage(log);
                }
            })
        }
        catch (e) {
            try {
                import("node:worker_threads").then(({ Worker }) => {
                    import("./../server/worker-thread.js").then(({ url }) => {
                        this.#worker = new Worker(url);
                        for (const log of this.#buffer) {
                            this.#worker.postMessage(log);
                        }
                    })
                })
            }
            catch (e) {
                console.log("WTF MAN")
            }
        }

    }
    static on() { }
    static postLog(log: Log) {
        if (this.#worker) {
            return this.#worker.postMessage(log);
        }
        this.#buffer.add(log);
    }
}