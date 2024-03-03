import { randomUUID } from "crypto";

export class BaseLog { 
    public readonly date = new Date();
    public readonly trace: string[] = new Error().stack?.split('\n') ?? [''];   
}