import { InfererDecorator } from "../../../utils/inferer-decorator/inferer-decorator.js";
import { Decorator, LogsMetadata } from "../../../utils/types/types.js";
import { LegacyDecoratorTracker } from "./legacy-decorator-tracker/legacy-decorator-tracker.js";
import { ModernDecoratorTracker } from "./modern-decorator-tracker/modern-decorator-tracker.js";

abstract class DecoratorTracker {
    private static _strategy: typeof ModernDecoratorTracker.decorate | typeof LegacyDecoratorTracker.decorate;
    static get decorate() {
        return this._strategy;
    }

    static {
        const _ref = { flag: false };
        @InfererDecorator(_ref)
        class DecoratorChecker {
            some = 0;
        }

        if (_ref.flag)
            DecoratorTracker._strategy = ModernDecoratorTracker.decorate;
        else
            DecoratorTracker._strategy = LegacyDecoratorTracker.decorate;
    }

}

export const Log = DecoratorTracker.decorate;


