import { ChildWorkerFactory } from "../child-worker-factory.js";
import('node:worker_threads')
    .then(({ isMainThread, parentPort }) => {
        if (!isMainThread && parentPort) {
            console.log('WORKER THREAD CREATED')
            ChildWorkerFactory.create(parentPort)//.subscribe();
        }
    })
    .catch(e => console.log("DID NOT FOUND THE WORKER MODULE", process))

export const url = import.meta.url;