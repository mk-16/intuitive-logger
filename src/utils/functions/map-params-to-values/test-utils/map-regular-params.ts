import { Context, Done } from "mocha";
import { mapParamsToValues } from "../map-params-to-values.js";

export const mapRegularParams = () => {
    return function (this: Context, done: Done) {
        const params = mapParamsToValues(['first', 'a', 'b', 'c', 'e', 'rest'], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        done();
    } as Mocha.Func
}
