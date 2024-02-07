"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const state_manager_1 = require("./state-manager");
const tracker_1 = require("./tracker");
class Logger {
    constructor() {
        this.stateManager = state_manager_1.LoggerStateManager;
    }
    static track(target) {
        if (typeof target === 'object') {
            return tracker_1.Tracker.trackObject(target);
        }
        return tracker_1.Tracker.trackFunction(target);
    }
}
exports.Logger = Logger;
function myAsyncFoo(a, b, c) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'done' });
        }, 3000);
    });
}
function mySyncFoo(a, b, c) { }
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
const g = { a: 0 };
const q = Logger.track(g);
const d = Logger.track(g);
d.a = 4;
q.a = 2;
g.a = 5;
console.log('\n\n\n\n\n\n\n\n\n');
console.log(state_manager_1.LoggerStateManager.getState());
//# sourceMappingURL=logger.js.map