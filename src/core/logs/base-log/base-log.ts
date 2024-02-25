export class BaseLog {
    //TODO update precision of date to support differences in milliseconds
    public date = new Date();
    public trace: string;
    constructor(row: number = 4) {
        this.trace = new Error().stack?.split('\n').slice(row).map(str => str.split('(')[1]?.split(')')[0])[0] ?? 'no trace';
    }
    print() {
        console.log(this);
    }
}