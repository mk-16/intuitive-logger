import { LegacyDecoratorTracker } from "./legacy-decorator-tracker/legacy-decorator-tracker.js";
import { ModernDecoratorTracker } from "./modern-decorator-tracker/modern-decorator-tracker.js";

abstract class DecoratorTracker {
    private static _strategy: ModernDecoratorTracker | LegacyDecoratorTracker;
    static get strategy() {
        return this._strategy;
    }
    static {
        function Infer(...args: any[]) {
            if (args.length == 2) {
                const [target, context] = args;
                if (target instanceof Function) {
                    const { kind, name, addInitializer } = context;
                    if (typeof kind === "string" && typeof name === "string" && typeof addInitializer === "function") {
                        DecoratorTracker._strategy = ModernDecoratorTracker.track
                    }
                }
            }
            DecoratorTracker._strategy = LegacyDecoratorTracker.track
        }

        @Infer
        class DecoratorChecker {
            @Infer
            some = 0
        }


    }

}

interface Log {
    new(..._: any[]): void
    (..._: any[]): any
}

export const Log = DecoratorTracker.strategy as Log;