import { describe } from "mocha";
import { CONTEXT } from "../../../index.js";
import assert from "assert";
import { existsSync, fsync, readFileSync } from "fs";
import path from "path";
// import {} from 'path';
// { trackByName: 'sync mock', expiresAfter: 2000, logContext: LOG_LEVEL.DEBUG }

describe("LegacyDecoratorTracker", function () {
    function Log(..._: any[]) { return (...args: any[]) => { } }
    @Log({ expiresAfter: 2000, logContext: CONTEXT.DEBUG })
    class MyCustomClass {
        @Log()
        myMethod() { }
        @Log()
        myAsyncMethod() { }
    }

    it("can infer if the configuration has legacy decorators or modern", function (done) {
        if (typeof process !== "undefined") {
            const fileName = "tsconfig.json";
            const intuitiveRoot = path.dirname(import.meta.url);

            
            function pathFinder(fileDir: string) {
                if (existsSync(path.join(fileDir, "tsconfig.ts"))) {
                    return fileDir;
                 }
                 else if(path.resolve(fileDir, '..') === fileDir){
                    return null; // Root directory reached, tsconfig.json not found
                 }
                 return pathFinder(path.resolve(fileDir, '..'));
            }

            console.log(pathFinder(intuitiveRoot));
            try {


                // readFileSync('')
            }
            catch (error) { }
        }
        console.log({ process: typeof process, window: typeof window })
        assert(true)
        done()
        // DecoratorTracker.tracking === "modern"
        // if ()
        // assert()
    })
    // it("infers feature by class name", function(){})
    // it("can override feature by user", function(){})
    // it("if feature not overriden, then configuration can be set once per feature", function(){})

    // it("handles legacy decorators", function () {


    // })
    // it("doesnt support property decorator", function () { })
    // it("doesnt support parameter decorator", function () { })
    // it("supports method decorator", function () { })
    // it("supports class decorator", function () { })
});