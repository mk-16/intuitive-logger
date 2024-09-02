import { describe, it } from "mocha";
import { reduceArrayParams } from "./test-utils/array-param.js";
import { reduceCombinedParams } from "./test-utils/combined-params.js";
import { reduceObjectParams } from "./test-utils/object-param.js";
import { reduceRegularParams } from "./test-utils/regular-param.js";
import { reduceRestParams } from "./test-utils/rest-param.js";


function suitFn(this: Mocha.Suite) {
    it("can reduce regular params", reduceRegularParams());
    it("can reduce rest params", reduceRestParams());
    it("can reduce destructed object params", reduceObjectParams());
    it("can reduce destructed array params", reduceArrayParams());
    it("can reduce combined params", reduceCombinedParams());
}

export const reduceParamsSpec = () => describe('Params Reducer', suitFn);
