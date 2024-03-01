import { parentPort } from 'worker_threads'
parentPort?.on('message', (message) => {
    console.log(message)
});