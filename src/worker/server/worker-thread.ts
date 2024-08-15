export const url = import.meta.filename;
import { fromEvent, tap } from "rxjs";
import { isMainThread, parentPort } from "worker_threads";
if (!isMainThread && parentPort)
    fromEvent<MessageEvent>(parentPort, "message").pipe(tap(e => console.log(e.data))).subscribe()
