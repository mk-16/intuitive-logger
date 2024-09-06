import { Context, Done } from "mocha";
import { mapParamsToValues } from "../map-params-to-values.js";

export const mapRegularParams = () => {
    return function (this: Context, done: Done) {
        const params = mapParamsToValues(['first', 'a', 'b', 'c', 'e', 'rest'], ["bigint$34", "boolean$true", "function$() => { }", "function$function () { }", "number$1", "string$some string", "symbol$my special symbol", "undefined$undefined", "promise$Promise", "null$null", '"object${\\"some\\":\\"string$property\\"}"']);
        done();
    } as Mocha.Func
}
