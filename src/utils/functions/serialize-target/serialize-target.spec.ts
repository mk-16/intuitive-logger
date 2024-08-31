import { describe, it } from "mocha";
import { serializeBigInt } from "./test-utils/serialize-big-int.js";
import { serializeBoolean } from "./test-utils/serialize-boolean.js";
import { serializeFunction } from "./test-utils/serialize-function.js";
import { serializeNumber } from "./test-utils/serialize-number.js";
import { serializeString } from "./test-utils/serialize-string.js";
import { serializeSymbol } from "./test-utils/serialize-symbol.js";
import { serializeUndefined } from "./test-utils/serialize-undefined.js";
import { serializeArray } from "./test-utils/serialize-array.js";
import { serializePromise } from "./test-utils/serialize-promise.js";





function suitFn(this: Mocha.Suite) {
    it("Can serialize a big int", serializeBigInt(BigInt(134)));
    it("Can serialize a boolean", serializeBoolean(false));
    it("Can serialize a lambda function expression", serializeFunction(() => { }));
    it("Can serialize a regular function expression", serializeFunction(function () { }));
    it("Can serialize a number", serializeNumber(13e3));
    it("Can serialize an string", serializeString('testing serializer'));
    it("Can serialize an symbol", serializeSymbol(Symbol(33)));
    it("Can serialize an undefined", serializeUndefined(undefined));
    it("Can serialize an promise", serializePromise(Promise.resolve('testing promise')));
    it("Can serialize an array with all the previous types", serializeArray([
        BigInt(34),
        true, () => { },
        function () { },
        1,
        "some string",
        Symbol('my special symbol'),
        undefined,
        Promise.resolve(true),
        null,
        { some: 'property' }
    ]));
}

export const SerializerSpec = () => describe('Serializer', suitFn);
