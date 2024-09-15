import { ChildWorkerFactory } from "../child-worker-factory.js";
import('node:worker_threads')
    .then(({ isMainThread, parentPort }) => {
        if (!isMainThread && parentPort) {
            ChildWorkerFactory.create(parentPort).subscribe(log => {
                parentPort.postMessage(log);
            })
        }
    })
    .catch(e => console.log("DID NOT FOUND THE WORKER MODULE", process))

export const url = import.meta.url;