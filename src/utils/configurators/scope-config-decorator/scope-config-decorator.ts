// import { InfererDecorator } from "../../inferer-decorator/inferer-decorator.js";
// import { LegacyScopeConfigDecorator } from "./legacy-scope-config-decorator/legacy-scope-config-decorator.js";
// import { ModernScopeConfigDecorator } from "./modern-scope-config-decorator/modern-scope-config-decorator.js";

// interface ConfigDecorator {
//     // (options?: Partial<LogsContext>): ReturnType<typeof ScopeConfigDecorator.decorate>
//     new <T extends never>(options: T): T
// }

// abstract class ScopeConfigDecorator {
//     private static _strategy: typeof ModernScopeConfigDecorator.decorate | typeof LegacyScopeConfigDecorator.decorate;
//     static {
//         const _ref = { flag: false };
//         @InfererDecorator(_ref)
//         class DecoratorChecker {
//             some = 0;
//         }

//         if (_ref.flag)
//             ScopeConfigDecorator._strategy = ModernScopeConfigDecorator.decorate;
//         else
//             ScopeConfigDecorator._strategy = LegacyScopeConfigDecorator.decorate;
//     }

//     static get decorate() {
//         return this._strategy;
//     };
// }

// // const ConfigScope: ConfigDecorator = ScopeConfigDecorator.decorate as ConfigDecorator;
// // export { ConfigScope };

