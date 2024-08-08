import { MonitoringOptions } from "../../types/monitoring-options.js";
import { exceptionThrowTimer } from "../timer/timer.js"
export function legacyMonitorDecorator<T extends object>(this: MonitoringOptions, target: T) {
    // const message = `Can't use @Log in ${(target as any).name}'s property without @Monitor decorator`
    console.log({target, this: this, kind: "legacy", arguments})

}
export function modernMonitorDecorator<T extends object>(this: MonitoringOptions, target: T, context: ClassDecoratorContext) {
    console.log({target, this: this, kind: "modern", context})
    
}


