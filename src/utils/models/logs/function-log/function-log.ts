import { BaseLog } from "../base-log/base-log.js";

export class FunctionLog extends BaseLog {
    constructor(
        public executionTime: string,
        public readonly inputs: any[],
        public output: any) {
        super();
    }
}