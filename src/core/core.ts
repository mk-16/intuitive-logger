import { DecoratorHandler } from "../utils/decorators/decorator-handler.js";
import type { LegacyArguments, ModernArguments, MonitorType } from "../utils/types/globals.js";



//todo types
function MonitorConstructor(...args: any[]) {
    if (new.target == MonitorConstructor) {
        return new Proxy(args[0], {
            get(target, property, receiver) {
                console.log({ target, property, receiver });
                return target[property]
            },
            set(target, property, newValue, receiver){
                return true
            },
        })
    }
    return DecoratorHandler
}
export const Monitor = MonitorConstructor as MonitorType;