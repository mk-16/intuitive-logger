// import { execSync } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import { cwd } from "process";
// cwd; fs; path;
// const fileName = 'intuitive-logger.json';
// const filePath = path.join(cwd(), fileName);

// try {
//     const file = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
//     console.log({ file });
// }
// catch (e) {
//     console.log('THERE IS AN ERROR', (e as any).message)
// }

// const a = execSync('git config --global --get user.name', { encoding: 'utf-8' }).split('\n')[0]
// console.log({ a })
export abstract class Logger {

    static trackMethod(...inputs: any[]) {
        console.log(" tracking method decorator")
        //depending on log level
        console.log(...inputs)
        return this;
    }
    static log(...args: any[]) {
        console.log({ args })
    }
}
