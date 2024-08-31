import { describe, it } from "mocha";
import { arrayParams } from "./test-utils/array-param.js";
import { combinedParams } from "./test-utils/combined-params.js";
import { objectParams } from "./test-utils/object-param.js";
import { regularParams } from "./test-utils/regular-param.js";
import { restParams } from "./test-utils/rest-param.js";


function suitFn(this: Mocha.Suite) {
    it("can map regular params", regularParams());
    it("can map rest params", restParams());
    it("can map destructed object params", objectParams());
    it("can map destructed array params", arrayParams());
    it("can map combined params", combinedParams());
}

export const mapParamsSpec = () => describe('Extract Params', suitFn);
