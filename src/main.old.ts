
// interface Log {
//     new(): any;
//     (args: any): any;
// }

// const Log: Log = (function (this: ThisType<any>, args?: any[]) {
//     return (target: any, key?: string | symbol, descriptor?: PropertyDescriptor) => {
//         target;
//         key;
//         descriptor;
//         args;
//         // console.log({ args, self: this, target, key, descriptor })
//         console.log({ key })
//     }
// }) as Log;

// // Log = new Log();
// // @Log('class Decorator')
// class SomeClass {
//     // @Log('property Decorator')
//     private static someProps = 1;

//     // @Log('method Decorator')
//     static someMethod() {
//         // console.log('some method')
//     }
//     constructor(@Log('attribute') attribute: any) {
//         SomeClass.someProps;
//         attribute;
//         // console.log('class')
//         // console.log('from constructor', attribute, SomeClass.someProps)
//     }
// }


// SomeClass.someMethod()

// new SomeClass('asd');