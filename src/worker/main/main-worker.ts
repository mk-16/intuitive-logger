import { catchError, from, map, Observer, Subject, Subscription, switchMap, takeUntil, tap } from "rxjs";
import { LoggerConfiguration } from "../../core/logger.js";
import { InternalLog, Log } from "../../utils/log/log.js";



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

    static #internalLogStream = new ControllableBufferSubject<InternalLog>();
    static #logStream = new Subject<Log>();
    static readonly logStream = this.#logStream.asObservable();


    static #worker = from(import("node:worker_threads")).pipe(
        switchMap(({ Worker }) => from(import("../server/worker-thread.js"))
            .pipe(
                map(({ url }) => new Worker(new URL(url), { "name": "intuitive-logger-worker" })),
                tap(worker => worker.on("message", (log) => this.#logStream.next(log)))
            )
        ),
        catchError(() =>
            from(import("../client/web-worker.js"))
                .pipe(
                    map(({ url }) => new Worker(url, { "name": "intuitive-logger-worker", "type": "module" })),
                    tap(worker => worker.onmessage = ({ data }) => this.#logStream.next(data))
                )
        )
    );

    static {
        this.#worker.pipe(
            switchMap((worker) => {
                this.#internalLogStream.stop();
                return this.#internalLogStream.pipe(tap(log => {
                    worker.postMessage({ log, config: LoggerConfiguration });
                }));
            }),
            takeUntil(this.#destroySignal)
        ).subscribe()
    }

    static onDestroy() {
        this.#destroySignal.next();
        this.#destroySignal.complete();
        this.#internalLogStream.complete();
    }

    static postLog(log: InternalLog) {
        this.#internalLogStream.next(log);
    }
}

