import { catchError, from, map, Observable, Observer, Subject, Subscription, switchMap, takeUntil, tap, timer } from "rxjs";
import { Log } from "../../utils/log/log.js";



class ControllableBufferSubject<T> extends Subject<T> {

    #buffer = new Set<T>();
    #isBuffering = true;

    stop() { this.#isBuffering = false; }
    continue() { this.#isBuffering = true; }
    toggle() { this.#isBuffering = !this.#isBuffering; }
    clear() { this.#buffer.clear(); }

    override next(value: T) {
        if (this.#isBuffering)
            this.#buffer.add(value);
        super.next(value);
    }


    override subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | undefined): Subscription;
    override subscribe(next?: ((value: T) => void) | null | undefined, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
    override subscribe(...args: []): Subscription {

        const subscription = super.subscribe(...args);
        const iterator = this.#buffer.values();
        let results = iterator.next();
        while (!results.done) {
            super.next(results.value);
            results = iterator.next();
        }

        return subscription;
    }
}

export class LoggerWorker {

    static #destroySignal = new Subject<void>();

    static #logStream = new ControllableBufferSubject<Log>();
    static readonly logStream = this.#logStream.asObservable();


    static #worker = from(import("node:worker_threads")).pipe(
        switchMap(({ Worker }) => from(import("../server/worker-thread.js"))
            .pipe(map(({ url }) => new Worker(new URL(url), { "name": "intuitive-logger-worker" })))
        ),
        catchError(() =>
            from(import("../client/web-worker.js"))
                .pipe(
                    map(({ url }) =>
                        new Worker(url, { "name": "intuitive-logger-worker", "type": "module" })
                    )
                )
        )
    );



    static {
        this.#worker.pipe(
            switchMap((worker) => {
                this.#logStream.stop();
                return this.#logStream.pipe(tap(log => {
                    worker.postMessage(log);
                }));
            }),
            takeUntil(this.#destroySignal)
        ).subscribe()
    }

    static onDestroy() {
        this.#destroySignal.next();
        this.#destroySignal.complete();
        this.#logStream.complete();
    }

    static postLog(log: Log) {
        this.#logStream.next(log);
    }
}

