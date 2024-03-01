import { BaseLog } from "../base-log/base-log.js";

export class FunctionLog extends BaseLog {
    constructor(
        public readonly executionTime: string,
        public readonly inputs: any[],
        public readonly output: any) {
        super();
    }
}