import { Errors } from "../types/enums.js";

export const noPostError = new ReferenceError(Errors.noPostMessage, { cause: Errors.noPostCause });
delete noPostError.stack;