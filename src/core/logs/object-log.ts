import { BaseLog } from "./base-log";

export class ObjectLog extends BaseLog {
    constructor(public previousValue: any, public updatedValue: any) {
        super();
    }
}