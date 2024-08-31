import { describe, it } from "mocha";
import { lambdaParams } from "./test-utils/lambdaParams.js";
import { constructorParams } from "./test-utils/constructorParams.js";
import { functionExpressionParams } from "./test-utils/regularParams.js";
import { generatorFunctionExpressionParams } from "./test-utils/generatorParams.js";



function suitFn(this: Mocha.Suite) {
    it("can extract function expression params", functionExpressionParams());
    it("can extract lambda params", lambdaParams());
    it("can extract generator function params", generatorFunctionExpressionParams());
    it("can extract constructor params", constructorParams());
}

export const extractParamsSpec = () => describe('Extract Params', suitFn);
