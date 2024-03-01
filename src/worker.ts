import { parentPort, workerData } from "worker_threads"

console.log('hello world from worker! FILE')
console.log(workerData.foo)
parentPort?.on('message', (message) => {
    console.log(message)
})
// import { parentPort, workerData, MessageChannel } from "worker_threads"

// const { port1, port2 } = new MessageChannel();
// port1.on('message', (message) => {
//     console.log(message)
// })
// port1.postMessage('XXX')
// port2.postMessage('ZZZ')
// port2.on('message', (message) => {
//     console.log(message)
// })
// parentPort?.on('message', (message) => {
//     console.log(message)
// })

// parentPort?.on('my-event', (message) => {
//     console.log(message)
// });