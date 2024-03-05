// import { deepFreeze } from "./utils/deep-freeze/deep-freeze.js"
// import { traverse } from "./utils/traverse/traverse.js"

// const mockedNestedObject = {
//     string: 'level 1',
//     number: 0,
//     array: [1, 2, 3, 4, 4, { type: 'nested array object', number: 1 }],
//     boolean: true,
//     undefined: undefined,
//     null: null,
//     set: new Set().add({
//         string: 'object in set',
//         number: 1,
//         boolean: true,
//         undefined: undefined,
//         null: null,
//     }),
//     object: {
//         string: 'nested object inside object',
//         number: 1,
//         boolean: true,
//         undefined: undefined,
//         null: null,
//         map: new Map().set(0, {
//             string: 'nested map in object',
//             number: 2,
//             boolean: true,
//             undefined: undefined,
//             null: null,
//             map: new Map().set(0, {
//                 string: 'nested map in map',
//                 number: 3,
//                 boolean: true,
//                 undefined: undefined,
//                 null: null,
//                 set: new Set().add({
//                     string: 'nested set in map',
//                     number: 4,
//                     boolean: true,
//                     undefined: undefined,
//                     null: null,
//                 })
//             })
//         }),
//     }
// }

// const l0l1 = {
//     L0: 0,
//     nested: {
//         L1: 1,
//     }
// }

// // deepFreeze(mockedNestedObject)

// // const b = traverse(deepFreeze(mockedNestedObject), (item, key) => {
// //     console.log({ item, key, isKeyFrozen: Object.isFrozen(item) })
// //     // console.log({ item, key, isKeyFrozen: Object.isFrozen(item) })
// // });
// // console.log({ b })

// console.log({
//     res: traverse({ a: 1 }, (e) => {
//         return e;
//     })
// })

const obj1 = {
    l0: 0,
    nested: {
        l1: new Map().set('l2', {
            l3: 3,
        }),
        nestedl1: {
            l2: 2,
        }
    }
}
function traverse(target: unknown, action: (..._: any) => any) {
    console.log('input', target)
    if (typeof target !== 'object' || target === null) {
        console.log('TARGET IS NOT VALID')
        return action(target)
    };

    function recursive<T extends Object>(target: T, seed: Partial<T> = {}): any {
        switch (true) {
            case target instanceof Map:
                console.log('TARGET IS A MAP')
            // return action(target)
            // return traverse(Object.fromEntries(target.entries()));
        }
        for (const [key, value] of Object.entries(target)) {
            console.log('iterating', [key, value]);
            seed[key as keyof T] = value;
            if (typeof value === 'object' && value !== null) {
                console.log('GOING DOWN ONE LEVEL IN', value)
                seed[key as keyof T] = action(value);
            }
        }
        return seed;
    }

    return recursive(target);
}

console.log('traverse result', traverse(obj1, (element) => {
    if (typeof element === 'object' && element !== null) {
        return traverse(element, (el2) => {
            return el2
        });
    }
    return element;
}))