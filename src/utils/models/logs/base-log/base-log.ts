export class BaseLog {
    public readonly date = new Date();
    constructor(public readonly trace: string) { };
}