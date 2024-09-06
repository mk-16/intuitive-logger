import { describe, it } from "mocha";
import { mapRegularParams } from "./test-utils/map-regular-params.js";
import { generatorFunctionExpressionParams } from "../extract-params/test-utils/generatorParams.js";
import { constructorParams } from "../extract-params/test-utils/constructorParams.js";

function suitFn(this: Mocha.Suite) {
    it("can map params", mapRegularParams());
    // it("can map generator function params", generatorFunctionExpressionParams());
    // it("can map constructor params", constructorParams());
}

export const mapParamsToValuesSpec = () => describe('Map Params', suitFn);