import { describe } from "mocha";
import { extractParamsSpec } from "./extract-params/extract-params.spec.js";
// import { findFileSpec } from "./find-file-in-stack/find-file-in-stack.spec.js";
import { reduceParamsSpec } from "./map-params/reduce-params.spec.js";
import { SerializerSpec } from "./serialize-target/serialize-target.spec.js";
import { mapParamsToValuesSpec } from "./map-params-to-values/map-params-to-values.spec.js";
import { ParserSpec } from "./parse-target/parse-target.spec.js";

describe("Util functions", ()=> {
    SerializerSpec();
    ParserSpec()
    reduceParamsSpec();
    extractParamsSpec();
    mapParamsToValuesSpec()
    // findFileSpec();
})