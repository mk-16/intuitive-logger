import { BaseLog } from "../base-log/base-log";

export class ObjectLog extends BaseLog {
    constructor(
        public readonly propertyChanged: string,
        public readonly previousValue: any,
        public readonly newValue: any) {
        super();
    }
}