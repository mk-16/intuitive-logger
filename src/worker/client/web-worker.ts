import { filter, fromEvent, tap } from "rxjs";
export const url = import.meta.url;

fromEvent<MessageEvent>(self, "message").pipe(filter(event => (event.target as any).name === "intuitive-logger-web-worker"), tap(console.log))
    .subscribe();