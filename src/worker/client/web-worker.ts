import { filter, fromEvent, map, tap, throttleTime } from "rxjs";
export const url = import.meta.url;

let counter = 0;
fromEvent<MessageEvent>(self, "message").pipe(filter(event => (event.target as any).name === "intuitive-logger-web-worker"), tap(console.log))
    .subscribe();

fromEvent(self, "mousemove").pipe(throttleTime(3000), map(e => counter++)).subscribe(() => {
    console.log({ counter });
    console.log(window)
});
