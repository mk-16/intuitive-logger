import { ChildWorkerFactory } from "../child-worker-factory.js";
try {
    if (self) {
        ChildWorkerFactory.create(self).subscribe(log => {
            self.postMessage(log);
        });
    }
}
catch (e) {
}

export const url = import.meta.url;

