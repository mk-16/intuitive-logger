import { LoggerWorker } from "../../worker/main/main-worker.js"

export function constructHandler<T extends Function>(this: any, target: T, argsArray: unknown[], targetConstructor: Function) {
    // console.log({ reflect: 'construct called', this: this })
    // LoggerWorker.postLog(this);    
    return Reflect.construct(target, argsArray, targetConstructor)
}