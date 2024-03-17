import { InfererDecorator } from "../../inferer-decorator/inferer-decorator.js";
import { LogsMetadata } from "../../types/types.js";
import { LegacyScopeConfigDecorator } from "./legacy-scope-config-decorator/legacy-scope-config-decorator.js";
import { ModernScopeConfigDecorator } from "./modern-scope-config-decorator/modern-scope-config-decorator.js";


export abstract class ScopeConfigDecorator {
    private static _strategy: <Return extends (..._: any[]) => any>(options: Partial<LogsMetadata>) => Return;
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

