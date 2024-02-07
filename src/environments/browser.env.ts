import { Config } from "./env";

export abstract class BrowserConfig extends Config {
    static get location(): string | null {
        try {
            return document.location.pathname;
        }
        catch (err) {
            return null;
        }
    }

}