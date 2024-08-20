export class LoggerWorker {
    static #buffer = [];
    static #worker;
    static {
        try {
            if (window !== undefined && window.Worker !== undefined)
                import("../client/web-worker.js").then(({ url }) => {
                    this.#worker = new Worker(new URL(url), { 'name': "intuitive-logger-web-worker", "type": "module" });
                    for (const log of this.#buffer) {
                        try {
                            this.#worker.postMessage(log);
                        }
                        catch (e) {
                            this.#worker.postLog(JSON.parse(JSON.stringify(log)));
                        }
                    }
                });
            else
                throw new Error("no window");
        }
        catch (e) {
            console.log("IN SERVER");
            import("worker_threads").then(({ Worker }) => {
                import("../server/worker-thread.js").then(({ url }) => {
                });
            });
        }
    }
    static on() { }
    static postLog(log) {
        if (this.#worker !== undefined) {
            try {
                this.#worker.postMessage(log);
            }
            catch (e) {
                this.#worker.postMessage(JSON.parse(JSON.stringify(log)));
            }
            return;
        }
        this.#buffer.push(log);
    }
}
//# sourceMappingURL=main-worker.js.map