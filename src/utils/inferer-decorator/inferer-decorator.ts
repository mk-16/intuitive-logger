
export function InfererDecorator(ref: { flag: boolean }) {
    return (..._: any[]) => {
        if (_.length == 2) {
            const [target, context] = _;
            if (target instanceof Function) {
                const { kind, name, addInitializer } = context;
                if (typeof kind === "string" && typeof name === "string" && typeof addInitializer === "function") {
                    ref.flag = true;
                }
            }
        }
        else {
            ref.flag = false;
        }
    }
}