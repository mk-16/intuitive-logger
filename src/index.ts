// try {
//     window;
//     console.log("running Client code");
//     import("./worker/client/web-worker.js").then(({ url }) => {
//         const worker = new Worker(new URL(url), { 'name': "intuitive-logger-web-worker", "type": "module" });
//         worker.postMessage("SUCCESSSS")
//     })
// }
// catch (e) {
//     console.log("running Server code");
//     import("node:worker_threads").then(({ Worker }) => {
//         import("./worker/server/worker-thread.js").then(({ url }) => {
//             const worker = new Worker(url)
//             worker.postMessage("WOUP WOUP")
//         })
//     })
// }

export { Monitor } from "./core/core.js";

// export { }
