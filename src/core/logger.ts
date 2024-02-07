import { randomUUID } from "crypto";
import { LoggerStateManager } from "./state-manager";
import { Tracker } from "./tracker";

export interface trackingConfiguration {
    uuid: string;
}
export class Logger {
    private stateManager = LoggerStateManager;
    static track<T extends object>(target: T, options?: trackingConfiguration): T
    static track<T extends any[], K>(target: (..._: T) => K, options?: trackingConfiguration) {
        if (typeof target === 'object') {
            return Tracker.trackObject(target, options)
        }
        return Tracker.trackFunction(target, options)
    }
}

const myFloorUUID = randomUUID()
function myAsyncFoo(a: string, b: boolean, c: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'done' })
        }, 3000);
    })
}
function mySyncFoo(a: string, b: boolean, c: number) { }


const g = { a: 0 }
class A {
    public prop = 1
    public method() {
        this.prop = 4
    }
    public async asynMethod() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: 'done' })
            }, 3000);
        })
    }
}

// Math.floor = Logger.track(Math.floor, { uuid: myFloorUUID })
// const myMyMy = Logger.track(myAsyncFoo)
// const myMy = Logger.track(mySyncFoo)
const a = Logger.track(new A())
// const d = Math.floor(1.123123)
// const c = Math.floor(1.123123)
// myMyMy('', true, 3)
// myMy('', false, 4)

// a.prop = 4
// a.prop = 4
// a.method()
a.method()
// a.asynMethod()
const state = LoggerStateManager.getImmidiateState()
console.log({ state_1: [...state!.values()][0], state_2: [...state!.values()][1]  })
// const d = Logger.track(g)
// Math.floor = recursionTest(Math.floor, { uuid: myFloorUUID })
// const b = Math.floor(1.123123)

// console.log('\n\n\n\n\n\n\n\n\n')
