export declare class BaseLog {
    date: Date;
    trace: string | undefined;
    print(): void;
}
export declare class ObjectLog extends BaseLog {
    previousValue: any;
    updatedValue: any;
    constructor(previousValue: any, updatedValue: any);
}
export declare class FunctionLog extends BaseLog {
    name: string;
    inputs: any;
    output: any;
    executionTime: string;
    constructor(name: string, startTime: number, endTime: number, inputs: any, output: any);
}
//# sourceMappingURL=log.d.ts.map