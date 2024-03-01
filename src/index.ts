// import { Worker, isMainThread, parentPort } from "worker_threads";
// import path from "path";
// import { fileURLToPath } from "url";

import { Logger } from "./core/logger/logger.js";
Logger.track({ a: 1, b: 2, c: 3 })
Logger.track({ a: 1, b: 2, c: 3 })
class Testing { 
    @Logger.decorate(1)
    method() {
        console.log('method')
    }
}
// if (isMainThread) {
//     console.log('hello world from main thread!');
//     const __filename = fileURLToPath(import.meta.url);
//     const worker = new Worker(path.join(path.dirname(__filename), "worker.js"), {
//         workerData: { foo: "bar" },
//     });
//     worker.postMessage('hello world from main thread!');
//     worker.emit("my-event", { asd: 1 })
//     // module.exports = function async() {
//     //     console.log('hello world from worker!')
//     //     return new Promise((resolve, reject) => {
//     //         console.log("isMainThread", isMainThread)
//     //         const worker = new Worker(__filename);
//     //         worker.on('message', resolve);
//     //         worker.on('error', reject);
//     //         worker.on('exit', (code) => {
//     //             if (code !== 0)
//     //                 reject(new Error(`Worker stopped with exit code ${code}`))
//     //         })
//     //     })
//     // }
// }
// else {
//     console.log('hello world from worker!')
//     // parentPort?.postMessage('hello world from worker!')
// }

// Logger.isReady
// import { Worker } from "worker_threads";
// console.log({import: import.meta.dirname + "\\worker\\worker.js"})
// new Worker(import.meta.dirname + "\\core\\worker\\worker.js")