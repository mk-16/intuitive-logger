import { ChildWorkerFactory } from "../child-worker-factory.js";
try {
    if (self) {
        ChildWorkerFactory.create(self)//.subscribe();;
    }
}
catch (e) {
}

export const url = import.meta.url;

