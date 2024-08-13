import { isMainThread, parentPort, Worker } from "worker_threads";
import { Log } from "./utils/log.js";
export enum LoggerWorkerEvents {
    data = "data"
}
const map = new Map();

export class LoggerWorker {
    static #worker: Worker;
    static {
        this.#worker = new Worker("./dist/node-thread-worker.js");
    } 
    static on(){}
    static postLog(log: Log ){
        this.#worker.postMessage(log);
    }   
}

// const test = 
// const config: Record<string, any> = {};
// config.env = typeof window !== "undefined" && window.document !== undefined ? "client" : "server"

// class LoggerWorker {
//     static #worker: Worker
//     static {
//         if (config.env == "client") {
//             console.log("ping")
//         } else {
//             // const port = new MessageChannel()
//             // this.#worker = 
//             setTimeout(() => {
//                 parentPort?.postMessage("hello world");
                
//             }, 0);
//         }
//     }
// }