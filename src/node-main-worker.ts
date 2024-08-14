// import { Worker } from "worker_threads";
// import "./node-thread-worker.js";
import { Log } from "./utils/log.js";

export enum LoggerWorkerEvents {
    data = "data"
}
const config: Record<string, any> = {};
config.env = typeof window != "undefined" && window.document ? "client" : "server"

export class LoggerWorker {
    static #worker: any;
    static #buffer = new Set();
    static {
        if (config.env == "server") {
            import('node:worker_threads').then(({ Worker }) => {
                if (import.meta.url.includes('intuitive-logger/dist')) {
                    this.#worker = new Worker(import.meta.dirname + '\\node-thread-worker.js');
                }
                else {
                    this.#worker = new Worker("./node_modules/intuitive-logger/dist/node-thread-worker.js");
                }
                for (const log of this.#buffer) {
                    this.#worker.postMessage(log);
                }
                this.#buffer.clear();
            })
        } else {
            import('./node-thread-worker.js').then((LoggerThreadWorker) => {
                this.#worker = new Worker('./node-thread-worker.js');
            })
            if (import.meta.url.includes('intuitive-logger/dist') && import.meta.dirname) {
                // this.#worker = new Worker(import.meta.dirname + '\\node-thread-worker.js');
            }
            
            else {
                const wtf = import.meta.resolve(import.meta.url.replace('node-main-worker', 'node-thread-worker'))
                this.#worker = new Worker(wtf);
            }

            for (const log of this.#buffer) {
                console.log({ worker: this.#worker.postMessage, log })
                this.#worker.postMessage(log);
            }
            this.#buffer.clear();
        }
    }
    static on() { }
    static postLog(log: Log) {
        console.log({ worker: this.#worker.postMessage, log})
        this.#worker?.postMessage(log) ?? this.#buffer.add(log);
    }
}