// export type Log = {
//     name: string | symbol | undefined;
//     date: string | undefined;
//     stack: string | undefined;
// }

// export interface ClassLog extends Log {
//     inputs: Record<string, unknown> | undefined;
// }

// export interface MethodLog extends Log {
//     startTime: number | undefined;
//     endTime: number | undefined;
//     inputs: Record<string, unknown> | undefined;
//     class: string;
//     output: unknown;
//     runtime?: number;
// }

// export interface ObjectLog extends Log {
//     previousValue: unknown;
//     currentValue: unknown;
// }


export type Log = {
    readonly name: string | symbol;
}

export interface FunctionLog {

}

export interface ClassLog extends Log {
    readonly classname: string;
}

export class ClassLog implements ClassLog {
    constructor(public readonly name: string | symbol, public readonly classname: string) {
    }

}

const test = new ClassLog('', '')