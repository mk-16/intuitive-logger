import { kind } from "../../../constants/kind.js";
import { legacyLogProperyDecorator, modernLogMethodDecorator } from "../../log/log-decorators.js";

export const LogPropertyDecorator = kind == "legacy-decorator" ?
    legacyLogProperyDecorator :
    modernLogMethodDecorator