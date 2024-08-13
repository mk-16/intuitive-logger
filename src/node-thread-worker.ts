import { MessagePort, parentPort } from "worker_threads";
import { classLogGuard, methodLogGuard, objectLogGuard } from "./utils/guards/log-guards.js";
import { Log } from "./utils/log.js";
import { fileFileInStack } from "./utils/find-file-in-stack.js";
export enum LoggerWorkerEvents {
    data = "data"
}
const map = new Map();


export class LoggerWorker {
    static #worker: MessagePort;
    static {
        
        parentPort?.on("message",(log: Log)=>{
            if(classLogGuard(log) || methodLogGuard(log)){
                const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
                delete log.startTime
                delete log.endTime
                log.runtime = runtime;
                log.stack = log.stack ? fileFileInStack(log.stack, log.kind =="method"?'legacy-method-decorator.js': 'index.js'): undefined;
                console.log(log)
            }
            
            else if(objectLogGuard(log)) {
                // console.log({...log})
            }
        })
    }

    static on(){}
    static postEvent(event: LoggerWorkerEvents, data:unknown ){
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