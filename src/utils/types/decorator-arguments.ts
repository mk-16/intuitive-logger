
type LegacyDecoratorProperty<T extends object> = keyof T;
export type ModernDecoratorContext = ClassDecoratorContext | ClassMethodDecoratorContext
    | ClassFieldDecoratorContext | ClassAccessorDecoratorContext | ClassGetterDecoratorContext |
    ClassSetterDecoratorContext;
    
export type DecoratorArguments<T extends object> = [(LegacyDecoratorProperty<T> | ModernDecoratorContext)?, PropertyDescriptor?]
