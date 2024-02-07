export declare abstract class Tracker {
    private static stateManager;
    static trackObject(target: {
        [key: string | symbol]: any;
    }): {
        [key: string]: any;
        [key: symbol]: any;
    };
    static trackFunction<T extends any[], K>(originalFunction: (..._: T) => K): (...args: T) => K;
}
//# sourceMappingURL=tracker.d.ts.map