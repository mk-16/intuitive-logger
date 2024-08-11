import { kind } from "../../../constants/kind.js";
import { legacyLogMethodDecorator, modernLogMethodDecorator } from "../../log/log-decorators.js";


export const LogMethodDecorator = kind == "legacy-decorator" ?
    legacyLogMethodDecorator :
    modernLogMethodDecorator;
