import { describe, it } from "mocha";
import { mapRegularParams } from "./test-utils/map-regular-params.js";

function suitFn(this: Mocha.Suite) {

    it("can map regular  params", mapRegularParams());
    // it("can extract lambda params", lambdaParams());
    // it("can extract generator function params", generatorFunctionExpressionParams());
    // it("can extract constructor params", constructorParams());
}

export const mapParamsToValuesSpec = () => describe('Map Params', suitFn);
