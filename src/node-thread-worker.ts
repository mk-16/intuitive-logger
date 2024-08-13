import { MessagePort, parentPort } from "worker_threads";
import { functionLogGuard, objectLogGuard } from "./utils/guards/log-guards.js";
import { Log } from "./utils/log.js";
export enum LoggerWorkerEvents {
    data = "data"
}
const map = new Map();


export class LoggerWorker {
    static #worker: MessagePort;
    static {
        
        parentPort?.on("message",(log: Log)=>{
            if(functionLogGuard(log)){
                const runtime = (log.endTime ?? 0) - (log.startTime ?? 0);
                delete log.startTime
                delete log.endTime
                log.runtime = runtime;
                const stackArray = log.stack?.split('\n') ?? [];
                const index = stackArray.findIndex(str => str.includes('legacy-method-decorator.js'));
                log.stack = 'file:///'.concat(stackArray[index+1].split('file:///')[1].split(')')[0]);
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