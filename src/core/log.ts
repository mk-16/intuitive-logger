export class BaseLog {
    public date = new Date();
    public trace = new Error().stack?.split('\n').slice(4).map(str => str.split('(')[1].split(')')[0])[0];
    // constructor() { }
    print() {
        console.log(this);
    }
}

export class ObjectLog extends BaseLog {
    constructor(public previousValue: any, public updatedValue: any) {
        super();
        this.print()
    }
}

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
                this.print();
            });
        }
        else {
            this.print()
        }

    }

    // print() {
    //     console.log({
    //         name: this.name,
    //         executionTime: this.executionTime,
    //         trace: this.trace,
    //         date: this.date,
    //         inputs: this.inputs,
    //         output: this.output
    //     })
    // }
}
