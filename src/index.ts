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
            action(value);
            this.map.set(key, value)// action(value);
        });
    }



    pack() {
        let output = {};
        let ref;
        this.map.forEach((value, mappedKey) => {
            console.log(mappedKey);
            const [_, ...compoundKey] = mappedKey.split('#');
            console.log({ compoundKey });
            compoundKey.forEach((key, index, { length: maxDepth }) => {
                const currentDepth = index + 1;
                const [] = 
                if (currentDepth !== maxDepth) {
                }
                else {
                }
            });
            // mappedKey.split('#').pop()?.forEach((mappedKey, index, { length: maxDepth }) => {
            //     const currentDepth = index + 1;
            //     if (currentDepth !== maxDepth) {
            //         const key = mappedKey.slice(7)
            //         console.log({ mappedKey, key, currentDepth, maxDepth })
            //     }
            // });
        });
        console.log(output);
    }
}


const traversable = new Traversable(mockedNestedObject);
traversable.apply((value) => {
    Object.freeze(value);
});

// traversable.apply((value) => {
//     console.log(Object.isFrozen(value));
// });

traversable.pack();
// console.log(traversable.map);