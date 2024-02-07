import { LoggerStateManager } from "./state-manager";
import { Tracker } from "./tracker";

export class Logger {
    private stateManager = LoggerStateManager;

    // static async printLogs() {
    //     for (const [functionName, logs] of this.functionsMap) {
    //         for (const log of logs) {
    //             console.log({ log: log })

    //         }
    //     }
    // }
    static track<T extends object>(target: T): T
    static track<T extends any[], K>(target: (..._: T) => K) {
        if (typeof target === 'object') {
            return Tracker.trackObject(target)
        }
        return Tracker.trackFunction(target)
    }
}

function myAsyncFoo(a: string, b: boolean, c: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'done' })
        }, 3000);
    })
}
function mySyncFoo(a: string, b: boolean, c: number) { }
// const myMyMy = Logger.track(myAsyncFoo)
// const myMy = Logger.track(mySyncFoo)
// Math.floor = Logger.track(Math.floor)
// const a = Math.floor(1.123123)
// const c = Math.floor(1.123123)
// const b = Math.floor(1.123123)
// myMyMy('', true, 3)
// myMy('', false, 4)
// a.then((t) => console.log('faster', t));
// console.log({ a, b, c })
// Logger.printLogs()

const g = { a: 0 }
const q = Logger.track(g)
const d = Logger.track(g)
d.a = 4
q.a = 2
g.a = 5

console.log('\n\n\n\n\n\n\n\n\n')
console.log(LoggerStateManager.getState())
