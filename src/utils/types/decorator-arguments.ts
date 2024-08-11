
export type LegacyDecoratorProperty = string | symbol;
export type ModernDecoratorContext = ClassMethodDecoratorContext
    | ClassFieldDecoratorContext;

export type DecoratorArguments<T extends object> = [T, LegacyDecoratorProperty | ModernDecoratorContext, PropertyDescriptor]
