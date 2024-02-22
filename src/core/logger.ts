import { BaseLog } from "./log";
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
    static track<T extends object>(target: T, label?: string): T
    static track<T extends any[], K>(target: (..._: T) => K, label?: never) {
        if (typeof target === 'object') {
            return Tracker.trackObject(target, label)
        }
        return Tracker.trackFunction(target)
    }
}

function myAsyncFoo(a: string, b: boolean, c: number) {
    return new Promise<{ status: string }>((resolve) => {
        setTimeout(() => {
            resolve({ status: 'done' })
        }, 3000);
    })
}
function mySyncFoo(a: string, b: boolean, c: number) { }
const myMyMy = Logger.track(myAsyncFoo)
const myMy = Logger.track(mySyncFoo)
Math.floor = Logger.track(Math.floor, 'hello')
const a = Math.floor(1.123123)
const c = Math.floor(1.123123)
const b = Math.floor(1.123123)
myMyMy('', true, 3).then(res => console.log('done', res));
myMyMy('', true, 3).then(res => console.log('done', res));
myMyMy('', true, 3).then(res => console.log('done', res));
myMy('', false, 4)
// a.then((t) => console.log('faster', t));
// console.log({ a, b, c })
// Logger.printLogs()
// const trackedClass = Logger.track(new BaseLog(), 'trackedClass');
// trackedClass.date = new Date();
// trackedClass.updateSelf('hello');
// trackedClass.date = new Date();
const myKeyedObject = { a: 0 };
const q = Logger.track(myKeyedObject)
// const d = Logger.track(g)
// d.a = 4
q.a = 4;
q.a = 3;
q.a = 2;

console.log({PRINTING_Q: q.a})
// console.log({MY_GETTER: q.a})
// g.a = 5

LoggerStateManager.getState().then(state => {
    // state.forEach((logs, key) => {
    //     console.log({ key, logs });
    // });
    state.get(myKeyedObject)?.forEach(log => {
        console.log({ log })
    })
})

console.log('\n\n\n\n\n\n\n');
