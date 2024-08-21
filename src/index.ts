import { Monitor } from "./core/core.js";

class MagicMath {

    @Monitor()
    static sum(a: number, b: number) {
        return a + b;
    }
}

MagicMath.sum(1, 2);

export { Monitor } from "./core/core.js";
