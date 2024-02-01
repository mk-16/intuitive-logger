"use strict";
// export function fff() {
//     return new Error()
//         .stack?.split("\n")[2]?.replace(/\(|\)/g, "").trim()
// }
// export enum MESSAGE_PARTS {
//     TARGET = "addTarget",
//     CONTEXT = "addContext",
//     HOST = "addHost",
//     LOCATION = "addLocation",
//     PERFOMANCE = "addPerfomance",
//     INPUTS = "addInputs",
//     OUTPUTS = "addOutputs"
// }
// // type Message = string;
// export class FactoryMessage {
//     private invokedMethods = new Map<MESSAGE_PARTS, Function>([
//         [MESSAGE_PARTS.TARGET, this[MESSAGE_PARTS.TARGET]],
//         [MESSAGE_PARTS.CONTEXT, this[MESSAGE_PARTS.CONTEXT]],
//         [MESSAGE_PARTS.HOST, this[MESSAGE_PARTS.HOST]],
//         // [MESSAGE_PARTS.INPUTS, this[MESSAGE_PARTS.INPUTS]],
//         // [MESSAGE_PARTS.OUTPUTS, this[MESSAGE_PARTS.OUTPUTS]],
//         // [MESSAGE_PARTS.LOCATION, this[MESSAGE_PARTS.LOCATION]],
//         // [MESSAGE_PARTS.PERFOMANCE, this[MESSAGE_PARTS.PERFOMANCE]]
//     ]);
//     // private message: string = "{\n";
//     // add(part: MESSAGE_PARTS, value: string) {
//     //     `   "function": "\x1b[38;2;220;220;170m${this.target.name}\x1b[0m",\n` +
//     //         `   "inside": "\x1b[38;2;220;220;170m${sk}\x1b[0m",\n` +
//     //         `   "at": "\x1b[38;2;50;188;176m${overrideTarget ?? pk}\x1b[0m", \n` +
//     //         `   "source": "\x1b[38;2;156;220;254m${this._location}\x1b[0m",\n` +
//     //         `   "with": [\x1b[38;2;86;156;214m${this.inputs}\x1b[0m],\n` +
//     //         `   "took": "\x1b[38;2;255;242;0m${performance.toFixed(3)} ms\x1b[0m",\n` +
//     //         `   "returned": [\x1b[38;2;197;134;192m${result}\x1b[0m]` +
//     //         "\n}"
//     //     switch (messagePart) {
//     //         case MESSAGE_PARTS.TARGET:
//     //         case MESSAGE_PARTS.CONTEXT:
//     //         case MESSAGE_PARTS.HOST:
//     //         case MESSAGE_PARTS.LOCATION:
//     //         case MESSAGE_PARTS.PERFOMANCE:
//     //         case MESSAGE_PARTS.INPUTS:
//     //         case MESSAGE_PARTS.OUTPUTS:
//     //     }
//     // }
//     private hasTargetPart: boolean = false;
//     // private hasContextPart: boolean = false;
//     // private hasHostPart: boolean = false;
//     public addTarget(value: string) {
//         // console.log();
//         value
//         this.invokedMethods.delete(MESSAGE_PARTS.TARGET)
//         const tuple = [...this.invokedMethods.entries()].reduce((acc, [key, val]) => {
//             key;val;
//             return acc//[key] = val;
//         }, {});
//         return { ...tuple }//as Omit<FactoryMessage, "addTarget">;
//     }
//     public addContext(value: string) {
//         // this.invokedMethods.set(MESSAGE_PARTS.CONTEXT)
//         // console.log(value);
//         value;
//         // return this as Omit<FactoryMessage, "addContext" | t extends true? "addTarget": ;
//         // var val: typeof tjt extends true ?
//         return this.hasTargetPart ? this as Omit<FactoryMessage, "addContext" | "addTarget"> : this as Omit<FactoryMessage, "addContext">;
//     }
//     public addHost(value: string): Omit<FactoryMessage, "addHost"> {
//         // console.log(value);
//         value;
//         return this;
//     }
// }
// const a = new FactoryMessage();
// a.addTarget("")//.addHost()//.addContext("")
// // a.addContext("as")
// // export function generateMessage(
// //     name: string,
// //     sk: string,
// //     pk: string,
// //     location: string,
// //     inputs: string
// // ) {
// //     return "{\n" +
// //         `   "function": "\x1b[38;2;220;220;170m${this.target.name}\x1b[0m",\n` +
// //         `   "inside": "\x1b[38;2;220;220;170m${sk}\x1b[0m",\n` +
// //         `   "at": "\x1b[38;2;50;188;176m${overrideTarget ?? pk}\x1b[0m", \n` +
// //         `   "source": "\x1b[38;2;156;220;254m${this._location}\x1b[0m",\n` +
// //         `   "with": [\x1b[38;2;86;156;214m${this.inputs}\x1b[0m],\n` +
// //         `   "took": "\x1b[38;2;255;242;0m${performance.toFixed(3)} ms\x1b[0m",\n` +
// //         `   "returned": [\x1b[38;2;197;134;192m${result}\x1b[0m]` +
// //         "\n}"
// // }
//# sourceMappingURL=utils.js.map