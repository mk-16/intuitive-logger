import { BaseLog } from "../base-log/base-log.js";

export class FunctionLog extends BaseLog {
    constructor(
        trace: string,
        public executionTime: string,
        public readonly inputs: any[],
        public output: any) {
        super(trace);
    }
}