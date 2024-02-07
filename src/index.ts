// import { Logger } from "./core/logger";
import { BrowserConfig } from "./environments/browser.env";
import { NodeConfig } from "./environments/node.env";

export * from "./core/logger"

if (BrowserConfig.location === null) {
 const a = ''
    // console.log({
        // a: NodeConfig.location,
    // })

} else {
    // console.log({
        // a: BrowserConfig.location,
    // })
}
export const Log = (...args: any[]) => {
    return (...args: any[]) => { }
}