import { cwd } from "process";
import { Config } from "./env";

export abstract class NodeConfig extends Config {
    static get location(): string | null {
        try {
            return cwd();
        }
        catch (err) {
            return null;
        }
    }
}