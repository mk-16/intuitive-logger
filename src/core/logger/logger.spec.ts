import { deepEqual, equal, notEqual } from "assert";
import { Logger } from "./logger";
import { LoggerStateManager } from "../state-manager/state-manager";

describe('Logger', (() => {
    it('returns a tracked object', () => {
        // const target = { a: 0 };
        // const trackedObject = Logger.track(target, { uuid: 'trackedObject' });
        // notEqual(target, trackedObject);
        // deepEqual(target, trackedObject);
        // target.a = 123;
        // deepEqual(target, trackedObject);
        // trackedObject.a = 666
        // deepEqual(target, trackedObject);
    })

    it('returns a tracked function', () => {
        function syncFunc(a: string, b: boolean, c: number) { }
        // const trackedFunction = Logger.track(syncFunc);
        // deepEqual(
        //     syncFunc('1', true, 3),
        //     trackedFunction('1', true, 3)
        // );
    })
    //     function asyncFunc(a: string, b: boolean, c: number) {
    //         return new Promise<void>((resolve) => {
    //             setTimeout(() => {
    //                 resolve()
    //             }, 3000);
    //         })
    //     }
    //     const target = { a: 0 };


    // })

    // it('track the target for changes', () => {
    //     function syncFunc(a: string, b: boolean, c: number) { }
    //     function asyncFunc(a: string, b: boolean, c: number) {
    //         return new Promise<void>((resolve) => {
    //             setTimeout(() => {
    //                 resolve()
    //             }, 3000);
    //         })
    //     }



}))