import { cwd } from "process";
import { Config } from "./env";

export abstract class NodeConfig extends Config {
    static location = cwd();
}