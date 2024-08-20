export class LoggerWorker {
    static #buffer = [];
    static #worker;
    static {
        try {
            if (window !== undefined)
                import("../client/web-worker.js").then(({ url }) => {
                    this.#worker = new Worker(new URL(url), { 'name': "intuitive-logger-web-worker" });
                    for (const log of this.#buffer) {
                        this.#worker.postMessage(log);
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
            return this.#worker.postMessage(log);
        }
        this.#buffer.push(log);
    }
}
//# sourceMappingURL=main-worker.js.map