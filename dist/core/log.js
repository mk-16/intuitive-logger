"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionLog = exports.ObjectLog = exports.BaseLog = void 0;
class BaseLog {
    constructor() {
        var _a;
        this.date = new Date();
        this.num = 0;
        this.trace = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split('\n').slice(4).map(str => str.split('(')[1].split(')')[0])[0];
    }
    print() {
        console.log(this);
    }
    updateSelf(some) {
        console.log('called', { some });
        this.date = new Date();
        this.num = 3;
    }
}
exports.BaseLog = BaseLog;
class ObjectLog extends BaseLog {
    constructor(previousValue, updatedValue) {
        super();
        this.previousValue = previousValue;
        this.updatedValue = updatedValue;
    }
}
exports.ObjectLog = ObjectLog;
class FunctionLog extends BaseLog {
    constructor(name, startTime, endTime, inputs, output) {
        super();
        this.name = name;
        this.inputs = inputs;
        this.output = output;
        this.executionTime = (endTime - startTime).toFixed(4).concat(' ms');
        if (this.output instanceof Promise)
            this.output.then((results) => {
                const endTime = performance.now();
                this.executionTime = (endTime - startTime).toFixed(4).concat(' ms');
                this.output = results;
            });
    }
}
exports.FunctionLog = FunctionLog;
//# sourceMappingURL=log.js.map