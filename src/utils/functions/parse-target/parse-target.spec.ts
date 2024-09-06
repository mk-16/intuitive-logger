import { describe, it } from "mocha";
import { parseBigInt } from "./test-utils/parse-big-int.js";
import { parseBoolean } from "./test-utils/parse-boolean.js";
import { parseFunction } from "./test-utils/parse-function.js";
import { parseNumber } from "./test-utils/parse-number.js";
import { parseString } from "./test-utils/parse-string.js";
import { parseSymbol } from "./test-utils/parse-symbol.js";
import { parseUndefined } from "./test-utils/parse-undefined.js";
import { parseArray } from "./test-utils/parse-array.js";
import { parsePromise } from "./test-utils/parse-promise.js";





function suitFn(this: Mocha.Suite) {
    it("Can parse a big int", parseBigInt("bigint$34"));
    it("Can parse a boolean", parseBoolean('boolean$true'));
    it("Can parse a lambda function expression", parseFunction("function$() => { }"));
    it("Can parse a regular function expression", parseFunction("function$function () { }"));
    it("Can parse a number", parseNumber("number$1"));
    it("Can parse an string", parseString('string$some string'));
    it("Can parse an symbol", parseSymbol("symbol$my special symbol"));
    it("Can parse an undefined", parseUndefined("undefined$undefined"));
    it("Can parse an promise", parsePromise("promise$Promise"));
    it("Can parse an array with all the previous types", parseArray('array$["bigint$34","boolean$true","function$() => { }","function$function () { }","number$1","string$some string","symbol$my special symbol","undefined$undefined","promise$Promise","null$null","object${\\"some\\":\\"string$property\\"}"]'));
}

export const ParserSpec = () => describe('Parser', suitFn);
