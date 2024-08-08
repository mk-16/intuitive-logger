// import { exceptionThrowTimer } from "../timer/timer.js"
// //decoratorName?
// export function legacyPropertyDecorator<T extends object>(this: any, target: T, property: string | symbol) {
//     const message = `Can't use @Log in ${(target as any).name}'s property without @Monitor decorator`
//     const timers: unknown[] = Reflect.getMetadata('error:timer', target.constructor) ?? [];
//     timers.push(exceptionThrowTimer(message));
//     Reflect.defineMetadata('error:timer', timers, target.constructor);
// }