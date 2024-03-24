import { BaseLog } from "../base-log/base-log.js";

export class ObjectLog extends BaseLog {
    constructor(
        public readonly propertyChanged: string | symbol | number,
        public readonly previousValue: any,
        public readonly newValue: any,
        trace: string) {
        super(trace);
    }
}