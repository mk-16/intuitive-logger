import { describe } from "mocha";
import { SerializerSpec } from "./serialize-target/serialize-target.spec.js";
import { extractParamsSpec } from "./extract-params/extract-params.spec.js";
import { mapParamsSpec } from "./map-params/map-params.spec.js";

describe("Util functions", ()=> {
    mapParamsSpec();
    extractParamsSpec();
    SerializerSpec();
})