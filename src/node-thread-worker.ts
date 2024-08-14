import { classLogGuard, methodLogGuard, objectLogGuard } from "./utils/guards/log-guards.js";
import { Log } from "./utils/log.js";
import { fileFileInStack } from "./utils/find-file-in-stack.js";

const config: Record<string, any> = {};
config.env = typeof window != "undefined" && window.document ? "client" : "server"
console.log("THREAD WAS READ")

if (config.env == "client" && onmessage) {
    self.onmessage = (message) => {
        console.log({ message })
    }
}
class LoggerThreadWorker {
    static #worker: any;
    static {
        try {
            // import("node:worker_threads").then(({MessagePort, parentPort}) => {
            //     if(config.env == "client" && onmessage)


            //     parentPort!.on("message",(log: Log)=>{
            //         if(classLogGuard(log) || methodLogGuard(log)){
            //             const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
            //             delete log.startTime
            //             delete log.endTime
            //             log.runtime = runtime;
            //             log.stack = log.stack ? fileFileInStack(log.stack): undefined;
            //             console.log(log)
            //         }

            //         else if(objectLogGuard(log)) {
            //             // console.log({...log})
            //         }
            //     })

            // })
        }
        catch (e) {
            console.log('failed', e)
        }
    }

    static on() { }
    static postEvent() {
        // this.#worker.postMessage([event,data]);
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

module.exports = { LoggerThreadWorker }