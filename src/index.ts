import { deepFreeze } from "./utils/deep-freeze/deep-freeze.js"

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

console.log(deepFreeze(mockedNestedObject))