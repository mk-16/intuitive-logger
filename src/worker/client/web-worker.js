import { filter, fromEvent, tap } from "rxjs";
export const url = import.meta.url;
fromEvent(self, "message").pipe(filter(event => event.target.name === "intuitive-logger-web-worker"), tap(console.log))
    .subscribe();
