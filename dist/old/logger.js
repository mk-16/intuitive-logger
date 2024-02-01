"use strict";
// import { BehaviorSubject } from "rxjs";
// import { LOG_ENVIRONMENT, LOG_LEVEL } from "./types";
// export class Logger {
//     private static _level: LOG_LEVEL;
//     private static _environment: LOG_ENVIRONMENT;
//     public static _flushTimeInterval: number = 0;
//     // public static readonly _counterMap = new Map<string, { counter: number, location: string }>();
//     public static set level(level: LOG_LEVEL) {
//         this._level = level;
//         this._level
//     }
//     public static set environment(environment: LOG_ENVIRONMENT) {
//         this._environment = environment;
//         this._environment;
//     }
//     constructor(private target: Function, private inputs: unknown[]) { }
//     private _location: string = "unknown";
//     private _key: string = "untraceable";
//     private _performance$ = new BehaviorSubject<number>(0);
//     private _results$ = new BehaviorSubject<unknown>(null);
//     createStack() {
//         this.target;
//         // const test = new Error().stack;
//         const error = new Error()
//             .stack?.split("\n")[3]?.replace(/\(|\)/g, "").trim();
//         const firstSplit = error ? error.indexOf(".") : -1//.split(".") : [];
//         const fileExtentionIndex = error ? error.lastIndexOf(".") : -1;
//         let wtf: any = [];
//         if (firstSplit !== fileExtentionIndex) {
//             wtf = error?.slice(firstSplit + 1).replace("[as target]", "").split(/  /g) ?? []
//         } else {
//             wtf = error?.split(/ /g).splice(1)?? [];
//         }
//         const [caller, location] = wtf;
//         this._key = caller ?? this._key;
//         this._location = location ?? this._location;
//         return this;
//     }
//     countInvocations() {
//         // const stackCount = (Logger._counterMap.get(this._key)?.counter ?? 0) + 1
//         // Logger._counterMap.set(this._key, { counter: stackCount, location: this._location })
//         return this;
//     }
//     handleSync() {
//         const time = performance.now();
//         this._results$.next(this.target.apply(this, this.inputs));
//         this._performance$.next(performance.now() - time)
//         return this;
//     }
//     handleAsync() {
//         if (this._results$.value instanceof Promise) {
//             const time = performance.now();
//             this._results$.value.then(data => {
//                 this._performance$.next(performance.now() - time);
//                 this._results$.next(data);
//             })
//         }
//         return this;
//     }
//     print(overrideTarget?: string) {
//         overrideTarget
//         const [pk] = this._key.split(".");
//         this._results$.subscribe(result => {
//             if (!(result instanceof Promise)) {
//                 this._performance$.subscribe(performance => {
//                     // invocations: ${Logger._counterMap.get(this._key)?.counter},
//                     const message = "{\n" +
//                         `   "function": "\x1b[38;2;220;220;170m${this.target.name}\x1b[0m",\n` +
//                         // `   "inside": "\x1b[38;2;220;220;170m${sk}\x1b[0m",\n` +
//                         `   "at": "\x1b[38;2;50;188;176m${overrideTarget ?? pk}\x1b[0m", \n` +
//                         `   "source": "\x1b[38;2;156;220;254m${this._location}\x1b[0m",\n` +
//                         `   "with": [\x1b[38;2;86;156;214m${this.inputs}\x1b[0m],\n` +
//                         `   "took": "\x1b[38;2;255;242;0m${performance.toFixed(3)} ms\x1b[0m",\n` +
//                         `   "returned": [\x1b[38;2;197;134;192m${result}\x1b[0m]` +
//                         "\n}"
//                     console.log(message)
//                 })
//             }
//         })
//         return this._results$.value;
//     }
// }
//# sourceMappingURL=logger.js.map