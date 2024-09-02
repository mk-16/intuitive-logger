// import { Context, Done } from "mocha";
// import { applyHandler } from '../../handlers/apply-handler/apply-handler.js'
// export const constructorParams = () => {
//     return function (this: Context, done: Done) {
//         const stack = new Error().stack;
//         // const file = findFileInStack(stack);
//         applyHandler(() => { }, this, [])
//         console.log({ filename: import.meta.filename, url: import.meta.url , stack})
//         done();
//     } as Mocha.Func
// }



// import { describe, it } from "mocha";
// import { findFileInStack } from "./find-file-in-stack.js";



// function suitFn(this: Mocha.Suite) {
//     it("can find the test file", constructorParams());
// }

// export const findFileSpec = () => describe('Find File', suitFn);
