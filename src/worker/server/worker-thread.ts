import { ChildWorkerFactory } from "../child-worker-factory.js";
import('node:worker_threads')
    .then(({ isMainThread, parentPort }) => {
        console.log('WORKER THREAD CREATED')
        if (!isMainThread && parentPort)
            ChildWorkerFactory.create(parentPort).subscribe();
    })
    .catch(e => console.log("DID NOT FOUND THE WORKER MODULE", process))

export const url = import.meta.url;