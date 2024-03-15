import { LogsFeature } from "../../../../utils/types/types.js";

export class ModernDecoratorTracker {
    public static track(options: Partial<LogsFeature>) {
        // target: any, context: DecoratorContext, options?: LogsFeature 
        return () => {};   
    }
}
