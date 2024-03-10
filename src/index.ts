import { count } from "console";

const mockedNestedObject = {
    string: 'level 1',
    number: 0,
    array: [1, 2, 3, 4, 4, { type: 'nested array object', number: 1 }],
    boolean: true,
    undefined: undefined,
    null: null,
    set: new Set().add({
        string: 'object in set',
        number: 1,
        boolean: true,
        undefined: undefined,
        null: null,
    }),
    object: {
        string: 'nested object inside object',
        number: 1,
        boolean: true,
        undefined: undefined,
        null: null,
        map: new Map().set(0, {
            string: 'nested map in object',
            number: 2,
            boolean: true,
            undefined: undefined,
            null: null,
            map: new Map().set(0, {
                string: 'nested map in map',
                number: 3,
                boolean: true,
                undefined: undefined,
                null: null,
                set: new Set().add({
                    string: 'nested set in map',
                    number: 4,
                    boolean: true,
                    undefined: undefined,
                    null: null,
                })
            })
        }),
    }
}


class Traversable {
    public map = new Map<string, unknown>();
    constructor(private target: unknown) {
        Traversable.scan(this.map, this.target);
    }

    private static isScanable(target: unknown): target is Object {
        return typeof target === 'object' && target !== null;
    }
    static scan(map: Map<string, unknown>, target: unknown, hash?: string) {
        let scanable;

        if (Traversable.isScanable(target)) {
            switch (true) {
                case target instanceof Array:
                    hash = hash ? `${hash}$array` : '$array';
                    scanable = target.entries();
                    break;
                case target instanceof Map:
                    hash = hash ? `${hash}$map` : '$map';
                    scanable = target.entries();
                    break;
                case target instanceof Set:
                    hash = hash ? `${hash}$set` : '$set';
                    scanable = Array.from(target).entries();
                    break;
                default:
                    hash = hash ? `${hash}$object` : '$object';
                    scanable = Object.entries(target);
            }
            for (const [key, value] of scanable) {
                if (Traversable.isScanable(value)) {
                    if (hash)
                        Traversable.scan(map, value, `${hash}#${key}`)
                    else
                        Traversable.scan(map, value, key)
                } else {
                    if (hash)
                        map.set(`${hash}#${key}`, value)
                    else map.set(key, value)
                }
            }
        }
    }

    apply(action: (..._: any[]) => any) {
        this.map.forEach((value, key) => {
            // action(value);
            this.map.set(key, action(value))// action(value);
        });
    }


    foo(steps: string[], value?: any, ref?: any): any {
        console.log('INPUUUUUTS', { steps, value, ref });
        while (steps.length > 0) {
            const [type, key] = steps.pop()?.split('#') ?? [];
            if (ref === undefined) {
                switch (type) {
                    case 'array':
                        ref = [];
                        ref.push(value);
                        break;
                    case 'map':
                        ref = new Map();
                        ref.set(key, value);
                        break;
                    case 'set':
                        ref = new Set();
                        ref.add(value);
                        break;
                    case 'object':
                        ref = { [key]: value };
                        break;

                }
                if (steps.length > 0) return this.foo(steps, undefined, ref)
                return ref;
                // return this.foo(steps, undefined, ref);
            }

            if (steps.length > 0) return this.foo(steps, undefined, ref)
            return ref
        }
        return ref

        // return { [key]: value }
    }


    pack() {
        let buffer: any = undefined;
        this.map.forEach((value, mappedKey) => {
            const [_, ...compoundKeys] = mappedKey.split('$');
            buffer = buffer ? { ...buffer, ...this.foo(compoundKeys, value, buffer) } : {...this.foo(compoundKeys, value, buffer)};
            console.log({ buffer })
            // const reduced = compoundKeys.reduce((acc: any, compoundKey, index, { length: depthLimit }) => {
            //     const depth = index + 1;
            //     // if()
            //     console.log({ compoundKey, depth, depthLimit, acc })

            // }, {})
            // console.log({ reduced })
            // const rootType = compoundKey[0].split('#')[0];
            // output = { ...output, ...foo(compoundKey, value) }
            // console.log({ output: foo(compoundKey, value) });
            // switch (rootType) {
            //     case 'array':
            //         console.log({ compoundKey, value })
            //         output = output ? [...output, foo(compoundKey, value)] : [foo(compoundKey, value)];
            //         break;
            //     // case 'map':
            //     // output = output ? [...output, foo(compoundKey, value)] : [foo(compoundKey, value)];
            //     // case 'set':
            //     // case 'object':
            //     default:
            //         // console.log({ compoundKey, value })
            //         output = output ? { ...output, ...foo(compoundKey, value) } : { ...foo(compoundKey, value) };
            // }
            // console.log({ output })
        });
    }
}


const traversable = new Traversable(mockedNestedObject);
// console.log(traversable.map);
// traversable.apply((value) => {
//     // ;
//     return value;
// });


// traversable.apply((value) => {
//     console.log({ isFrozen: Object.isFrozen(value), value })
//     return value;
// });

traversable.pack();
// console.log(traversable.map);