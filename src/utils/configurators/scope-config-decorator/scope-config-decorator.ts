import { InfererDecorator } from "../../inferer-decorator/inferer-decorator.js";
import { LogsMetadata } from "../../types/types.js";
import { LegacyScopeConfigDecorator } from "./legacy-scope-config-decorator/legacy-scope-config-decorator.js";
import { ModernScopeConfigDecorator } from "./modern-scope-config-decorator/modern-scope-config-decorator.js";


abstract class ScopeConfigDecorator {
    private static _strategy: (options?: LogsMetadata) => (...args: any[]) => any;
    static {
        const _ref = { flag: false };
        @InfererDecorator(_ref)
        class DecoratorChecker {
            some = 0;
        }

        if (_ref.flag)
            ScopeConfigDecorator._strategy = ModernScopeConfigDecorator.decorate;
        else
            ScopeConfigDecorator._strategy = LegacyScopeConfigDecorator.decorate;
    }

    static get decorate() {
        return this._strategy;
    };
}


type Dec<T> = T extends ClassDecoratorContext ?
    <K>(target: K, context: T) => K :
    (target: T) => T

interface ConfigDecorator<K> {
    <T>(options?: LogsMetadata): Dec<T>
    new <T extends never>(options: T): T
}

const ConfigScope: ConfigDecorator<typeof ScopeConfigDecorator.decorate> =
    ScopeConfigDecorator.decorate as ConfigDecorator<any>;

export { ConfigScope };

