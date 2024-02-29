import assert from "assert";
import { describe } from "mocha";
import { freezeObject } from "./utils";

describe('utils', function () {
    it('recursively freezes an object', function () {
        const mockObject = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3,
                    f: {
                        g: 4
                    }
                }
            }
        }
        const copiedObject = structuredClone(mockObject);
        const frozenObject = freezeObject(copiedObject);
        function isFrozen(obj: any) {
            if (obj instanceof Object) {
                for (const key in obj) {
                    if (obj[key] instanceof Object) {
                        isFrozen(obj[key]);
                    }
                    assert(Object.isFrozen(obj[key]), 'item is not frozen');
                }
            }
        }
        isFrozen(frozenObject);
    })
});