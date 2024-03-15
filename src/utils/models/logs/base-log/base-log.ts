export class BaseLog {
    public readonly date = new Date();
    public readonly trace: string = new Error().stack?.split('\n')[4].trim().slice(3) ?? 'untraceable';
}