import { ChildWorkerFactory } from "../child-worker-factory.js";
import('node:worker_threads')
    .then(({ isMainThread, parentPort }) => {
    if (!isMainThread && parentPort)
        ChildWorkerFactory.create(parentPort);
})
    .catch(e => console.log("DID NOT FOUND THE WORKER MODULE", process));
export const url = import.meta.url;
//# sourceMappingURL=worker-thread.js.map