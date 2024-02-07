import { Logger } from "../core/logger/logger";
import { LoggerStateManager } from "../core/state-manager/state-manager";

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
