import { BrowserConfig } from './environments/browser.env';
import { NodeConfig } from './environments/node.env';
try {
    process;
    console.log({ location: NodeConfig.location })
}
catch (error) {
    console.log({location: BrowserConfig.location})
    console.log('runnign in browser')
}

function log(...argsv1: any[]) {
    argsv1;
    return (...argsv2: any[]) => {
        argsv2;
    }
}

export const Log = log;