import { ChildWorkerFactory } from "../child-worker-factory.js";
try {
    if (self) {
        ChildWorkerFactory.create(self);
    }
}
catch (e) {
}

export const url = import.meta.url;

