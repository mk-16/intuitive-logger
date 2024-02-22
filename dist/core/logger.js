"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const state_manager_1 = require("./state-manager");
const tracker_1 = require("./tracker");
class Logger {
    constructor() {
        this.stateManager = state_manager_1.LoggerStateManager;
    }
    static track(target, label) {
        if (typeof target === 'object') {
            return tracker_1.Tracker.trackObject(target, label);
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
const myMyMy = Logger.track(myAsyncFoo);
const myMy = Logger.track(mySyncFoo);
Math.floor = Logger.track(Math.floor, 'hello');
const a = Math.floor(1.123123);
const c = Math.floor(1.123123);
const b = Math.floor(1.123123);
myMyMy('', true, 3).then(res => console.log('done', res));
myMyMy('', true, 3).then(res => console.log('done', res));
myMyMy('', true, 3).then(res => console.log('done', res));
myMy('', false, 4);
// a.then((t) => console.log('faster', t));
// console.log({ a, b, c })
// Logger.printLogs()
// const trackedClass = Logger.track(new BaseLog(), 'trackedClass');
// trackedClass.date = new Date();
// trackedClass.updateSelf('hello');
// trackedClass.date = new Date();
const myKeyedObject = { a: 0 };
const q = Logger.track(myKeyedObject);
// const d = Logger.track(g)
// d.a = 4
q.a = 4;
q.a = 3;
q.a = 2;
console.log({ PRINTING_Q: q.a });
// console.log({MY_GETTER: q.a})
// g.a = 5
state_manager_1.LoggerStateManager.getState().then(state => {
    var _a;
    // state.forEach((logs, key) => {
    //     console.log({ key, logs });
    // });
    (_a = state.get(myKeyedObject)) === null || _a === void 0 ? void 0 : _a.forEach(log => {
        console.log({ log });
    });
});
console.log('\n\n\n\n\n\n\n');
//# sourceMappingURL=logger.js.map