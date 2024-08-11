import "reflect-metadata";
import { Monitor } from "./core/monitor-factory/monitor.js";
import { Log } from "./core/log-factory/log.js";

@Monitor({ metered: true })
class b {

    // @Log({ metered: false })
    // @Monitor.propertyDecorator({ metered: false })
    property = false;

    @Log({ metered: true })
    // @Monitor.methodDecorator({ metered: false })
    method(param: any) { };
    // anotherMethod(@Monitor() param: any) { }
    // constructor(@Monitor() muahah: any) { }
}

const c = new b();
const ac = new b();
c.method(1)
const bc = new b();
// const foo = Monitor.functionMonitor(() => {})