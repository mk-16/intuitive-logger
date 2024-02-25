import { BaseLog } from "../base-log/base-log";

export class ObjectLog extends BaseLog {
    constructor(public previousValue: any, public updatedValue: any, row = 4) {
        super(row);
    }
}