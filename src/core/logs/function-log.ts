import { BaseLog } from "./base-log";

export class FunctionLog extends BaseLog {
    public executionTime: string;
    constructor(public name: string, startTime: number, endTime: number, public inputs: any, public output: any) {
        super();
        this.executionTime = (endTime - startTime).toFixed(4).concat(' ms')
        if (this.output instanceof Promise) {
            this.output.then((results) => {
                const endTime = performance.now();
                this.executionTime = (endTime - startTime).toFixed(4).concat(' ms')
                this.output = results;
            });
        }
    }
}
