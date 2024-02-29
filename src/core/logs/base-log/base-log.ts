export class BaseLog {
    readonly date: Date = new Date();
    readonly trace: string[] = new Error().stack?.split('\n') ?? [''];   
}